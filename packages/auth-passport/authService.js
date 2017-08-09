var logger = require('@raincatcher/logger').getLogger();
var CONSTANTS = require('./constants');
var $fh = require('fh-js-sdk');
var cloudUrl;
var dialog;

function AuthService($http, $window, dialogService) {
  this.http = $http;
  this.window = $window;
  dialog = dialogService;
  this.initAuth();
}

AuthService.prototype.initAuth = function() {
  $fh.on('fhinit', function(error) {
    if (error) {
      logger.error('Unable to initialize auth service due to unsuccessful $fh.init', error);
    }
    cloudUrl = $fh.getCloudURL();
  });
}

AuthService.prototype.accountManagement = function() {
  dialog.showAlert({
    title: 'Unable to do this operation',
    textContent: 'This operation is available on Keycloak only',
    ok: 'OK'
  });
}
AuthService.prototype.getProfile = function() {
  var req = {
    method: 'GET',
    url: cloudUrl + CONSTANTS.PROFILE_URL
  };

  return this.http(req, {withCredentials: true}).then(function(res) {
    return res.data;
  }).catch(function(err) {
    if (err.status === 401) {
      this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
    } else if (err.status === 403) {
      dialog.showAlert({
        title: 'Forbidden',
        textContent: 'You are not authorized to access this resource.',
        ok: 'OK'
      });
    } else {
      dialog.showAlert({
        title: 'Error Retrieving Profile Data',
        textContent: 'Unable to retrieve profile data, please login',
        ok: 'Login'
      }).then(function() {
        this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
      });
    }
  });
}

AuthService.prototype.hasResourceRole = function(role) {
  console.log('has Resource Role called');
  // TODO: implement has resource role functionality
}

AuthService.prototype.login = function() {
  return this.window.location = cloudUrl + CONSTANTS.LOGIN_URL;
}

AuthService.prototype.logout = function() {
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
        textContent: 'Log out operation is not available offline, please try again',
        ok: 'OK'
      });
    } else {
      dialog.showAlert({
        title: 'Logout Error',
        textContent: 'The log out operation failed, please try again',
        ok: 'OK'
      });
    }
  });
}

angular.module('wfm.auth.passport').factory('authService', ['$http', '$window', 'dialogService', 
  function($http, $window, dialogService) {
  return new AuthService($http, $window, dialogService);
}]);