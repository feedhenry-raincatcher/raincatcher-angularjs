var logger = require('@raincatcher/logger').getLogger();
var CONSTANTS = require('./constants');
var $fh = require('fh-js-sdk');
var cloudUrl;
var userProfile;

var PassportAuthService = function PassportAuthService($http, $window, $mdDialog, $state) {
  this.http = $http;
  this.window = $window;
  this.dialog = $mdDialog;
  this.state = $state;
  this.init();
}

/**
 * Initializes $fh and retrieves the server's URL.
 */
PassportAuthService.prototype.init = function() {
  var self = this;
  $fh.on('fhinit', function(error) {
    if (error) {
      logger.error('Unable to initialize auth service due to unsuccessful $fh.init', error);
    } else {
      self.setCloudUrl();
    }
  });
}

/**
 * Sets the cloud URL
 */
PassportAuthService.prototype.setCloudUrl = function() {
  // Note: decodeURIComponent is used for backwards compatability from Keycloak to Passport  
  cloudUrl = decodeURIComponent($fh.getCloudURL());
}

/**
 * Retrieves the cloud URL
 */
PassportAuthService.prototype.getCloudUrl = function() {
  return cloudUrl;
}
/**
 * Sends a request to the profile endpoint to retrieve the user's profile data.
 * @returns Returns the profile data retrieved from the server.
 */
PassportAuthService.prototype.getProfile = function() {
  var self = this;
  var url = self.getCloudUrl() + CONSTANTS.PROFILE_URL;
  return self.http.get(url).then(function(res) {
    if (res.data) {
      return res.data;
    }
  }).catch(function(error) {
    self.window.location = self.getCloudUrl() + CONSTANTS.LOGIN_URL;
  });
}

/**
 * Checks if the user has the specified role
 * @param role - The required role needed by the user in order to access the resource
 */
PassportAuthService.prototype.hasResourceRole = function(role) {
  // TODO: this needs to be refactored
  if (userProfile.roles && userProfile.roles.length > 0) {
    return userProfile.roles.indexOf(role) > -1;
  }
  return false;
}

/**
 * Redirects to the login page
 */
PassportAuthService.prototype.login = function() {
  var self = this;
  return self.window.location = self.getCloudUrl() + CONSTANTS.LOGIN_URL;
}

/**
 * Logs out the user.
 * Redirects the user to the login page on successful logout.
 */
PassportAuthService.prototype.logout = function() {
  var self = this;
  var url = self.getCloudUrl() + CONSTANTS.LOGOUT_URL;
  return self.http.get(url).then(function() {
    self.window.location = self.getCloudUrl() + CONSTANTS.LOGIN_URL;
  }).catch(function(err) {
    self.dialog.show(self.dialog.alert({
      title: 'Logout Operation Failed',
      textContent: 'The log out operation failed',
      ok: 'OK'
    }));
  });
}

module.exports = PassportAuthService;
