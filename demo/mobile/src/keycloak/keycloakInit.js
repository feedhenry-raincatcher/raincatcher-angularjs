var Keycloak = require('keycloak-js');
var Logger = require('@raincatcher/logger').Logger;
var logger = require('@raincatcher/logger').logger;
var ConsoleLogger = require('@raincatcher/logger').ConsoleLogger;

// keycloak init config
var initConfig = {onLoad: 'login-required'};

// the keycloak json config
var keycloakJS = Keycloak({
  "realm": "raincatcher",
  "url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "clientId": "raincatcher-mobile",
  "public-client": true,
  "use-resource-role-mappings": true
});

var auth = {};

/**
* Initializes the Keycloak JS adapter and make it available to controllers
* and services in the application.
*/

angular.element(document).ready(function() {
  keycloakJS.init(initConfig).success(function() {
    logger.info("Keycloak Ininitalisation Success");
    auth = keycloakJS;
    angular.module('wfm-mobile').factory('Auth', function() {
      return auth;
    });
    // NOTE: Angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
    angular.bootstrap(document, ["wfm-mobile"]);
  }).error(function(err) {
    logger.error("Error Initialising Keycloak JS", err);
  });
});