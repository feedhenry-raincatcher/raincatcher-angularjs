var CONSTANTS = require('../constants');

/**
 *
 * Controller for user login / logout
 *
 * @param $timeout
 *
 */
function LoginCtrl($timeout, $http, authService) {
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
      // TODO: Do $http call here to login endpoint
      // login should return back the token.
      // Set token in local storage then authenticate
      // Set profile data to local storage here upon successful login

      $http.post('http://localhost:8001/token', {
        username: self.username,
        password: self.password
      }).then(function(res) {
        localStorage.setItem(CONSTANTS.TOKEN_CACHE_KEY, res.data.token);
        console.log('----- Authenticating ----');
        $http({
          method: 'POST',
          url: 'http://localhost:8001/login-mobile',
          headers: {
            'Authorization': 'JWT ' + localStorage.getItem(CONSTANTS.TOKEN_CACHE_KEY)
          },
          data: {}
        }).then(function(success) {
          $http.get('http://localhost:8001/profile').then(function(res) {
            localStorage.setItem('rcuser_profile', JSON.stringify(res.data));
          }).catch(function(error) {
            console.log('Unable to get profile data', error);
          })
        }).catch(function(error) {
          // Need to handle when server is offline (status: -1)
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
    // securityService.logout();
  };
}

angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE).controller('LoginCtrl', ['$timeout', '$http', 'authService', LoginCtrl]);
