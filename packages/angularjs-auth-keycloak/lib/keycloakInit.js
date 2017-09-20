var Keycloak = require('keycloak-js');
var Promise = require('bluebird');
var logger = require('@raincatcher/logger').getLogger();

/**
 * Extract attribute fields from the profile data returned by Keycloak
 * @param attributeFields - Object which contains all the attributes of a user
 */
function extractAttributeFields(attributeFields) {
  var attributes = {};
  if (attributeFields) {
    for (var field in attributeFields) {
      if (attributeFields[field].length > 0) {
        attributes[field] = attributeFields[field][0];
      }
    }
  }
  return attributes;
}

/**
 * Formats profile data as expected by the application
 * @param profileData - Object which contains the profile data of a user
 */
function formatProfileData(profileData) {
  var profile;
  if (profileData) {
    profile = extractAttributeFields(profileData.attributes);
    profile.username = profileData.username;
    profile.email = profileData.email;
  }
  return profile;
}

module.exports = function(appName, keycloakConfig, initConfig) {
  /**
  * Initializes the Keycloak JS adapter and make it available to controllers
  * and services in the application.
  */
  angular.element(document).ready(function() {
    // Setup KeycloakJS Adapter with the given keycloakConfig
    var keycloakJS = Keycloak(keycloakConfig);

    keycloakJS.init(initConfig).success(function() {
      logger.info('Successfully initialised Keycloak instance');
      angular.bootstrap(document, [appName]);
    }).error(function(err) {
      logger.error('Failed to initialise Keycloak due to the following error', err);
      angular.bootstrap(document, [appName]);
    });

    angular.module(appName).factory('authService', function() {
        var keycloakAuthService = keycloakJS;
        keycloakAuthService.getProfile = function() {
          return new Promise(function(success, error) {
            keycloakAuthService.loadUserProfile().success(function(profileData) {
              return success(formatProfileData(profileData));
            }).error(error);
          });
        }
        keycloakAuthService.setListener = function() {
          // NOTE: No need to listen to login/logout events for Keycloak as the login page is in a different page from the app itself.
        };
        return keycloakAuthService;
      });
    
    // NOTE: Angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
    // angular.bootstrap(document, [appName]);
});
}