var CONSTANTS = require('./constants.js');
var PassportAuthService = require('@raincatcher/angularjs-auth-passport')('wfm-mobile');

/**
 * Auth service for the mobile app which extends the Passport Auth module
 */
function MobileAuthService($http, $window, $mdDialog, $state) {
  this.state = $state;
  this.http = $http;
  this.loginListener = null;
  PassportAuthService.call(this, $http, $window, $mdDialog, $state);
};

MobileAuthService.prototype = Object.create(PassportAuthService.prototype);
MobileAuthService.prototype.constructor = MobileAuthService;
MobileAuthService.prototype.getProfile = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    var userProfile = localStorage.getItem(CONSTANTS.USER_CACHE_KEY);
    if (userProfile) {
      try {
        userProfile = JSON.parse(userProfile);
        if (self.loginListener) {
          self.loginListener(userProfile);
        }
        return resolve(userProfile);
      } catch(err) {
        if (self.loginListener) {
          self.loginListener();
        }
        return reject(new Error(err));
      }
    }
    if (self.loginListener) {
      self.loginListener();
    }
    return reject(new Error('User profile not found'));
  });
};

MobileAuthService.prototype.authenticate = function(username, password) {
  var self = this;
  var url = PassportAuthService.prototype.getCloudUrl.call(this) + CONSTANTS.TOKEN_LOGIN_URL;
  return new Promise(function(resolve, reject) {
    self.http.post(url, {
      username: username,
      password: password
    }).then(function(res) {
      localStorage.setItem(CONSTANTS.TOKEN_CACHE_KEY, res.data.token);
      localStorage.setItem(CONSTANTS.USER_CACHE_KEY, JSON.stringify(res.data.profile));
      if (self.loginListener) {
        self.loginListener(res.data.profile);
      }
      resolve();
    }).catch(function(err) {
      if (self.loginListener) {
        self.loginListener();
      }
      if (err.status === 401) {
        reject(new Error('Invalid Credentials'));
      } else if (err.status === -1) {
        reject(new Error('You are offline'));
      }
      reject(err);
    });
  });
}

MobileAuthService.prototype.setListener = function(listener) {
  this.loginListener = listener;
}

MobileAuthService.prototype.getListener = function() {
  return this.loginListener;
}

MobileAuthService.prototype.login = function() {
  var self = this;
  return self.state.go(CONSTANTS.LOGIN_STATE_ROUTE);
};

MobileAuthService.prototype.logout = function() {
  var self = this;
  localStorage.clear();
  if (self.loginListener) {
    self.loginListener();
  }
  self.state.go(CONSTANTS.LOGIN_STATE_ROUTE, undefined, {reload: true});
};

angular.module(CONSTANTS.MOBILE_AUTH_MODULE_ID).factory('authService', ['$http', '$window', '$mdDialog', '$state',
  function($http, $window, $mdDialog, $state) {
    var mobileAuthService = new MobileAuthService($http, $window, $mdDialog, $state);
    return mobileAuthService;
  }]);