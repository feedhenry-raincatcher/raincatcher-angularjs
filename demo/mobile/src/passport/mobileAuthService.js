var CONSTANTS = require('./constants.js');
var PassportAuthService = require('@raincatcher/angularjs-auth-passport')('wfm-mobile');

angular.module(CONSTANTS.MOBILE_AUTH_MODULE_ID).factory('authService', ['$http', '$window', '$mdDialog', '$state',
  function($http, $window, $mdDialog, $state) {
    function MobileAuthService($http, $window, $mdDialog, $state) {
      this.state = $state;
      PassportAuthService.call(this, $http, $window, $mdDialog, $state);
    };

    MobileAuthService.prototype = Object.create(PassportAuthService.prototype);
    MobileAuthService.prototype.constructor = MobileAuthService;
    MobileAuthService.prototype.getProfile = function() {
      return new Promise(function(resolve, reject) {
        var userProfile = localStorage.getItem(CONSTANTS.USER_CACHE_KEY);
        if (userProfile) {
          try {
            userProfile = JSON.parse(userProfile);
          } catch(err) {
            return reject(new Error(err));
          }
        }
        return resolve(userProfile);
      });
    };
    MobileAuthService.prototype.authenticate = function(username, password) {
      var url = PassportAuthService.prototype.getCloudUrl.call(this) + CONSTANTS.TOKEN_LOGIN_URL;
      return new Promise(function(resolve, reject) {
        $http.post(url, {
          username: username,
          password: password
        }).then(function(res) {
          localStorage.setItem(CONSTANTS.TOKEN_CACHE_KEY, res.data.token);
          localStorage.setItem(CONSTANTS.USER_CACHE_KEY, JSON.stringify(res.data.profile));
          resolve();
        }).catch(function(err) {
          if (err.status === 401) {
            reject(new Error('Invalid Credentials'));
          } else if (err.status === -1) {
            reject(new Error('You are offline'));
          }
          reject(err);
        });
      });
    }
    MobileAuthService.prototype.login = function() {
      var self = this;
      return self.state.go(CONSTANTS.LOGIN_STATE_ROUTE);
    };
    MobileAuthService.prototype.logout = function() {
      var self = this;
      localStorage.clear();
      self.state.go(CONSTANTS.LOGIN_STATE_ROUTE, undefined, {reload: true});
    };
    var mobileAuthService = new MobileAuthService($http, $window, $mdDialog, $state);
    return mobileAuthService;
  }]);