var logger = require('@raincatcher/logger').getLogger();
var CONSTANTS = require('./constants');
var $fh = require('fh-js-sdk');
var cloudUrl;
var dialog;
var userProfile;

function PassportAuthService($http, $window, dialogService) {
  this.http = $http;
  this.window = $window;
  dialog = dialogService;
  this.init();
}

/**
 * Initializes $fh and retrieves the server's URL.
 */
PassportAuthService.prototype.init = function() {
  $fh.on('fhinit', function(error) {
    if (error) {
      logger.error('Unable to initialize auth service due to unsuccessful $fh.init', error);
    } else {
      cloudUrl = decodeURIComponent($fh.getCloudURL());
    }
  });
}

/**
 * Sends a request to the profile endpoint to retrieve the user's profile data.
 * @returns Returns the profile data retrieved from the server.
 */
PassportAuthService.prototype.getProfile = function() {
  var req = {
    method: 'GET',
    url: cloudUrl + CONSTANTS.PROFILE_URL
  };

  return this.http(req, {withCredentials: true}).then(function(res) {
    userProfile = res.data;
    return userProfile;
  }).catch(function(err) {
    if (err.status === 401) {
      this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
    } else if (err.status === 403) {
      dialog.showAlert({
        title: 'Forbidden',
        textContent: 'You are not authorized to access this resource.',
        ok: 'OK'
      });
    } else if (err.status === -1) {
      logger.warn('You are offline, returning last profile data retrieved from the server')
      return userProfile;
    } else {
      dialog.showAlert({
        title: 'Error Retrieving Profile Data',
        textContent: 'Unable to retrieve profile data due to the following error: ' + err + 'Please login',
        ok: 'Login'
      }).then(function() {
        this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
      });
    }
  });
}

/**
 * Checks if the user has the specified role
 * @param role - The required role needed by the user in order to access the resource
 */
PassportAuthService.prototype.hasResourceRole = function(role) {
  if (userProfile.roles && userProfile.roles.length > 0) {
    return userProfile.roles.indexOf(role) > -1;
  }
  return false;
}

/**
 * Redirects to the login page
 */
PassportAuthService.prototype.login = function() {
  return this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
}

/**
 * Logs out the user.
 * Redirects the user to the login page on successful logout.
 */
PassportAuthService.prototype.logout = function() {
  var req = {
    method: 'GET',
    url: cloudUrl + CONSTANTS.LOGOUT_URL
  };

  return this.http(req, {withCredentials: true}).then(function() {
    this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
  }).catch(function(err) {
    if (err.status === -1) {
      dialog.showAlert({
        title: 'You Are Offline',
        textContent: 'Log out operation is not available offline, please try again.',
        ok: 'OK'
      });
    } else {
      dialog.showAlert({
        title: 'Logout Operation Failed',
        textContent: 'The log out operation failed due to the following error: ' + err + ' Please try again.',
        ok: 'OK'
      });
    }
  });
}

angular.module('wfm.auth.passport').factory('authService', ['$http', '$window', 'dialogService', 
  function($http, $window, dialogService) {
  return new PassportAuthService($http, $window, dialogService);
}]);