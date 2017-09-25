var Keycloak = require('keycloak-js');
var Promise = require('bluebird');
var logger = require('@raincatcher/logger').getLogger();
var interceptor = require("./authInterceptor");
/**
 * Initializes keycloak library
 */
module.exports = function(appName, angularModule, keycloakConfig, initConfig) {
  // Setup KeycloakJS Adapter with the given keycloakConfig
  var keycloakJS = Keycloak(keycloakConfig);
  /**
  * Initializes the Keycloak JS adapter and make it available to controllers
  * and services in the application.
  */
  angular.element(document).ready(function() {
    if (window.navigator.onLine) {
      keycloakJS.init(initConfig).success(function() {
        interceptor(angularModule, keycloakJS);
        logger.info('Successfully initialised Keycloak instance');
        keycloakJS.initialized = true;

        // NOTE: Angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
        angular.bootstrap(document, [appName]);
      }).error(function(err) {
        logger.error('Failed to initialise Keycloak due to the following error', err);
      });
    } else {
      angular.bootstrap(document, [appName]);
    }
  });
  return keycloakJS;
}
