var profileDataMapper = require('./profileData');

var PROFILE_CACHE_KEY = 'rc_profile';

/**
 * Keycloak security interface
 *
 * @param keycloakLib - initialized keycloak javascript wrapper
 * @param $mdDialog - angularjs dialog
 */
var KeycloakAuth = function(keycloakLib, $mdDialog) {
  this.keycloakLib = keycloakLib;
};

KeycloakAuth.prototype.login = function() {
  if (this.keycloakLib) {
    return this.keycloakLib.login();
  }
  if (window.navigator.onLine) {
    return self.showDialog("Keycloak server cannot be reached. Please restart application");
  } else {
    return self.showDialog("Cannot login to application while offline");
  }
}

KeycloakAuth.prototype.logout = function() {
  if (this.keycloakLib) {
    localStorage.clear(PROFILE_CACHE_KEY);
    return this.keycloakLib.logout();
  }
  if (window.navigator.onLine) {
    return self.showDialog("Keycloak server cannot be reached. Please restart application");
  } else {
    return self.showDialog("Cannot logout to application while offline");
  }
}

KeycloakAuth.prototype.authenticate = function() {
  // Not supported - keycloak internally authenticates with his server.
  // Supporting same interface as passport.js
}

KeycloakAuth.prototype.hasRole = function(role, resource) {
  if (this.keycloakLib) {
    this.keycloakLib.hasResourceRole(role, resource);
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
      if (!window.navigator.onLine) {
        return self.showDialog("Cannot login to application while offline");
      }
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

/**
 * Show dialog when keycloak is offline
 * Internal - non interface method
 */
KeycloakAuth.prototype.showDialog = function(message) {
  alert = this.$mdDialog.alert({
    title: 'Operation not permitted',
    textContent: message || 'Cannot perform operation while offline',
    ok: 'Close'
  });
  this.$mdDialog.show(alert)
}

module.exports = KeycloakAuth;
