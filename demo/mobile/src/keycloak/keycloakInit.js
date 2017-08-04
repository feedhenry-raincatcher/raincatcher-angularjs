var Keycloak = require('keycloak-js');
var config = require('../app/config/config');
var Promise = require('bluebird');
var logger = require('@raincatcher/logger').getLogger();

function formatProfileData(profileData) {
  var profile;
  if (profileData) {
    profile = {
      id: profileData.attributes.id ? profileData.attributes.id[0] : '',
      username: profileData.username ? profileData.username : '',
      name: profileData.attributes.name ? profileData.attributes.name[0] : '',
      position: profileData.attributes.position ? profileData.attributes.position[0] : '',
      phone: profileData.attributes.phone ? profileData.attributes.phone[0] : '',
      email: profileData.email ? profileData.email : '',
      notes: profileData.attributes.notes ? profileData.attributes.notes[0] : '',
      avatar: profileData.attributes.avatar ? profileData.attributes.avatar[0] : '',
      banner: profileData.attributes.banner ? profileData.attributes.banner[0] : ''
    }
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
      logger.info("Keycloak Ininitalisation Success");
      auth = keycloakJS;
      auth.getProfile = function() {
        return new Promise(function(success, error) {
          auth.loadUserProfile().success(function(profileData) {
            return success(formatProfileData(profileData));
          }).error(error);
        });
      };

      angular.module('wfm-mobile').factory('Auth', function() {
        return auth;
      });
      // NOTE: Angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
      angular.bootstrap(document, ["wfm-mobile"]);
    }).error(function(err) {
      logger.error("Error Initialising Keycloak JS", err);
    });
  } else {
    angular.module('wfm-mobile').factory('Auth', function() {
      return null;
    });
    angular.bootstrap(document, ['wfm-mobile']);
  }
});