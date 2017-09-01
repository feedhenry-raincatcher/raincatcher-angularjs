var CONSTANTS = require('../constants');

/**
 *
 * Controller for user login / logout
 *
 * @param $timeout
 *
 */
function LoginCtrl($timeout, $http, $state, authService) {
  var self = this;
  self.loginErrorMessage = "";
  self.loginMessages = { success: false, error: false };
  $timeout(function() {
    self.hasSession = false;
  });
  self.login = function(valid) {
    if (valid) {
      self.loginErrorMessage = "";
      self.loginMessages.error = false;

      $http.post('http://localhost:8001/token', {
        username: self.username,
        password: self.password
      }).then(function(res) {
        localStorage.setItem(CONSTANTS.TOKEN_CACHE_KEY, res.data.token);
        localStorage.setItem('rcuser_profile', JSON.stringify(res.data.profile));
        $http({
          method: 'POST',
          url: 'http://localhost:8001/login-mobile',
          headers: {
            'Authorization': 'JWT ' + localStorage.getItem(CONSTANTS.TOKEN_CACHE_KEY)
          },
          data: {}
        }).then(function() {
          console.log('success');
          // TODO: redirect to home page here.
        }).catch(function(error) {
          // TODO: Need to handle when server is offline (status: -1)
          console.log('ERROR: ', error);
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
    localStorage.clear();
  };
}

angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE).controller('LoginCtrl', ['$timeout', '$http', '$state', 'authService', LoginCtrl]);
