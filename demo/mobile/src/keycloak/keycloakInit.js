var Keycloak = require('keycloak-js');
var config = require('../app/config/config');
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

var auth = {};

/**
* Initializes the Keycloak JS adapter and make it available to controllers
* and services in the application.
*/
angular.element(document).ready(function() {
  if (config.keycloakConfig) {
    // keycloak init config
    var initConfig = {onLoad: 'login-required'};

    // Setup Keycloak JS Adapter with Keycloak config
    var keycloakJS = Keycloak(config.keycloakConfig);

    keycloakJS.init(initConfig).success(function() {
      logger.info("Keycloak Initialisation Success");
      auth = keycloakJS;
      auth.getProfile = function() {
        return new Promise(function(success, error) {
          auth.loadUserProfile().success(function(profileData) {
            return success(formatProfileData(profileData));
          }).error(error);
        });
      };

      angular.module('wfm-mobile').factory('authService', function() {
        return auth;
      });
      // NOTE: Angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
      angular.bootstrap(document, ["wfm-mobile"]);
    }).error(function(err) {
      logger.error("Error Initialising Keycloak JS", err);
    });
  } else {
    angular.module('wfm-mobile').factory('authService', function() {
      return null;
    });
    angular.bootstrap(document, ['wfm-mobile']);
  }
});
