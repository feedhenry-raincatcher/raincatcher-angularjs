var logger = require('@raincatcher/logger').getLogger();
var CONSTANTS = require('./constants');
var $fh = require('fh-js-sdk');
var cloudUrl;
var userProfile;
var USER_CACHE_KEY = 'rcuser_profile';

function PassportAuthService($http, $window, $mdDialog, $state, isMobile) {
  this.http = $http;
  this.window = $window;
  this.dialog = $mdDialog;
  this.state = $state;
  this.isMobile = isMobile;
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
 * TODO: update this description
 * Sends a request to the profile endpoint to retrieve the user's profile data.
 * @returns Returns the profile data retrieved from the server.
 */
PassportAuthService.prototype.getProfile = function() {
  var self = this;
  console.log('--- Get Profile Called ---');
  return new Promise(function(resolve, reject) {
    var userProfile = localStorage.getItem(USER_CACHE_KEY);
    if (userProfile) {
      try {
        userProfile = JSON.parse(userProfile);
      } catch(err) {
        return reject(new Error(err));
      }
    } else {
      self.http.get('http://localhost:8001/profile').then(function(res) {
        console.log(' >>>>>>>>>> received profile data');
        if (res.data) {
          localStorage.setItem('rcuser_profile', JSON.stringify(res.data));
        }
      }).catch(function(error) {
        console.log('Unable to get profile data', error);
      })
    }
    return resolve(userProfile);
  });
}

// Add function to save the profile data to cache

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
  // This should add profile data to cache
  // Login url should be configurable
  // Login for mobile app should be a $http call to authenticate <-- this is going to be in the login-controller
  if (this.isMobile) {
    return this.state.go('app.login');
  }
  return this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
}

/**
 * Logs out the user.
 * Redirects the user to the login page on successful logout.
 */
PassportAuthService.prototype.logout = function() {
  // TODO: this should remove user profile from cache
  // The redirection should redirect to the appropriate login pages for each apps.
  var req = {
    method: 'GET',
    url: cloudUrl + CONSTANTS.LOGOUT_URL
  };
  var self = this;
  localStorage.clear();
  return this.http(req, { withCredentials: true }).then(function() {
    this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
  }).catch(function(err) {
    if (err.status === -1) {
      self.dialog.show(self.dialog.alert({
        title: 'You Are Offline',
        textContent: 'Log out operation is not available offline, please try again.',
        ok: 'OK'
      }));
    } else {
      self.dialog.show(self.dialog.alert({
        title: 'Logout Operation Failed',
        textContent: 'The log out operation failed',
        ok: 'OK'
      }));
    }
  });
}

module.exports = function(isMobile) {
  angular.module('wfm.auth.passport').factory('authService', ['$http', '$window', '$mdDialog', '$state',
    function($http, $window, $mdDialog, $state) {
      return new PassportAuthService($http, $window, $mdDialog, $state, isMobile);
    }]);

  angular.module('wfm.auth.passport').config(['$httpProvider', function($httpProvider) {
    // This property needs to be set to true in order for Passport to work
    $httpProvider.defaults.withCredentials = true;
    // Mobile need to have a separate httpProvider from portal to enable the use of Authorization headers
  }]);
};

