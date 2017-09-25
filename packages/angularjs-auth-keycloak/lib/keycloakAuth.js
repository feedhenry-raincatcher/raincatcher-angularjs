var profileDataMapper = require('./profileData');

var PROFILE_CACHE_KEY = 'rc_profile';

var KeycloakAuth = function(keycloakLib) {
  this.keycloakLib = keycloakLib;
};

KeycloakAuth.prototype.login = function() {
  if (this.keycloakLib) {
    this.keycloakLib.login(arguments);
  }
}

KeycloakAuth.prototype.logout = function() {
  if (this.keycloakLib) {
    this.keycloakLib.logout(arguments);
  }
}

KeycloakAuth.prototype.authenticate = function() {
  if (this.keycloakLib) {
    this.keycloakLib.authenticate(arguments);
  }
}

KeycloakAuth.prototype.hasResourceRole = function() {
  if (this.keycloakLib) {
    this.keycloakLib.hasResourceRole(arguments);
  }
}

KeycloakAuth.prototype.getProfile = function() {
  var self = this;
  return new Promise(function(success, error) {
    var userProfile = localStorage.getItem(PROFILE_CACHE_KEY);
    if (userProfile) {
      try {
        userProfile = JSON.parse(localStorage.getItem(PROFILE_CACHE_KEY));
        return success(userProfile);
      } catch (error) {
        return error(error);
      }
    } else {
      self.keycloakLib.loadUserProfile().success(function(profileData) {
        var userProfile = profileDataMapper(profileData);
        localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(userProfile));
        return success(userProfile);
      }).error(error);
    }
  });
}

KeycloakAuth.prototype.setListener = function() {
  // NOTE: No need to listen to login/logout events for Keycloak as the login page is in a different page from the app itself.
};

KeycloakAuth.prototype.setKeycloak = function(keycloakLib) {
  this.keycloakLib = keycloakLib;
};

/**
 * Internal method to retrieve keycloak library.
 */
KeycloakAuth.prototype.getKeycloak = function(keycloakLib) {
  this.keycloakLib;
};

module.exports = KeycloakAuth;
