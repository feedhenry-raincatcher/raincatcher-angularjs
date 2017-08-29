var CONSTANTS = require('../constants');

/**
 *
 * Controller for user login / logout
 *
 * @param $timeout
 * @param {UserMediatorService} userMediatorService
 *
 * @constructor
 */
function LoginCtrl($timeout, userMediatorService) {
  var self = this;
  self.loginErrorMessage = "";
  self.loginMessages = { success: false, error: false };

  self.login = function(valid) {
    if (valid) {
      self.loginErrorMessage = "";
      self.loginMessages.error = false;
      /// TODO inject security service
      // securityService.login(self.username, self.password)
      //   .then(function() {
      //     $timeout(function() {
      //       self.loginMessages.success = true;
      //     });
      //   }.catch(function(err) {
      //     $timeout(function() {
      //       self.loginMessages.error = true;
      //       self.loginErrorMessage = err.toString();
      //     });
      //   }));
    }
  };

  self.logout = function() {
    // securityService.logout();
  };
}

angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE).controller('LoginCtrl', ['$timeout', LoginCtrl]);
