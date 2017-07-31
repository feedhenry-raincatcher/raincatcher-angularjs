var fh = require('fh-js-sdk');

function AuthService() {
}

AuthService.prototype.getProfile = function($http, $window) {
  var req = {
    method: 'GET',
    url: fh.getCloudURL()+ '/profile'
  };
  return $http(req, {withCredentials: true}).then(function(res) {
    return res.data;
  }, function(err) {
    if (err.status === 401) {
      $window.location = fh.getCloudURL() + '/login';
    }
    if (err.status === 403) {
      console.log('Forbidden')
    }
    return err;
  });
};

AuthService.prototype.logout = function($http, $window) {
  var req = {
    method: 'GET',
    url: fh.getCloudURL() + '/logout'
  };

  return $http(req, {withCredentials: true}).then(function(res) {
    $window.location = fh.getCloudURL() + '/login';
  }, function(err) {
    console.log('error logging out');
  });
};

angular.module('wfm.common.apiservices').service('authService', function() {
  return new AuthService();
});
