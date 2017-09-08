var CONSTANTS = require('../constants');

function LoginCtrl($timeout, $http, $state, $scope, userService, userConfig) {
  var self = this;
  self.title = userConfig.title || "RainCatcher Mobile";
  self.loginErrorMessage = "";
  self.loginMessages = { success: false, error: false };
  $timeout(function() {
    self.hasTokenData = !!localStorage.getItem(CONSTANTS.TOKEN_CACHE_KEY);
  });
  self.login = function(valid) {
    if (valid) {
      self.loginErrorMessage = "";
      self.loginMessages.error = false;
      userService.authenticate(self.username, self.password).then(function(err) {
        $timeout(function() {
          self.loginMessages.success = true;
          $state.go('app.workorder', undefined, { reload: true });
        });
      }).catch(function(err) {
        $timeout(function() {
          self.loginMessages.error = true;
          self.loginErrorMessage = err;
        });
      });
    }
  };

  self.logout = function() {
    userService.logout();
  };
}

angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE).controller('LoginCtrl', ['$timeout', '$http', '$state', '$scope', 'userService', 'USER_CONFIG', LoginCtrl]);
