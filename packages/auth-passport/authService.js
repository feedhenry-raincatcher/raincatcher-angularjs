var logger = require('@raincatcher/logger').getLogger();
var CONSTANTS = require('./constants');
var $fh = require('fh-js-sdk');
var cloudUrl;

function AuthService($http, $window, dialogService) {
  this.http = $http;
  this.window = $window;
  this.dialogService = dialogService;
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

AuthService.prototype.getProfile = function() {
  var req = {
    method: 'GET',
    url: cloudUrl + CONSTANTS.PROFILE_URL
  };

  return this.http(req, {withCredentials: true}).then(function(res) {
    return res.data;
  }).catch(function(err) {
    if (err.status === 401) {
      this.login();
    } else if (err.status === 403) {
      this.dialogService.showAlert({
        title: 'Forbidden',
        textContent: 'You are not authorized to access this resource.',
        ok: 'OK'
      });
    } else {
      this.dialogService.showAlert({
        title: 'Error Retrieving Profile Data',
        textContent: 'Unable to retrieve profile data, please login',
        ok: 'Login'
      }).then(function() {
        this.login();
      });
    }
  });
}

AuthService.prototype.hasResourceRole = function() {
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
    this.login();
  }).catch(function(err){
    this.dialogService.showAlert({
      title: 'Logout Error',
      textContent: 'The log out operation failed, please try again',
      ok: 'OK'
    });
  });
}

angular.module('wfm.auth.passport').factory('authService', ['$http', '$window', 'dialogService', 
  function($http, $window, dialogService) {
  return new AuthService($http, $window, dialogService);
}]);
