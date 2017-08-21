var Promise = require("bluebird");
var $fh = require('fh-js-sdk');

function UserService(authService, $http, urlPromise) {
  this.auth = authService;
  this.$http = $http;
  this.urlPromise = urlPromise;
}

/**
 * Fetch profile data of currently logged in user
 */
UserService.prototype.readUser = function readUser() {
  return this.auth.getProfile();
};

UserService.prototype.readUserById = function readUser(id) {
  var self = this;
  return this.urlPromise.then(function(baseUrl) {
    return self.$http.get(baseUrl + "/api/users/" + id)
  });
};

UserService.prototype.listUsers = function listUsers(filter) {
  var self = this;
  return this.urlPromise.then(function(baseUrl) {
    return self.$http
      .get(baseUrl + "/api/users?filter=" + filter + "&limit=20")
      .then(function(response) {
        if (response.data) {
          return response.data.users;
        }
        return [];
      });
  });
};


UserService.prototype.hasResourceRole = function hasResourceRole(role) {
  return this.auth.hasResourceRole(role);
};


UserService.prototype.login = function login() {
  return this.auth.login();
};

UserService.prototype.logout = function logout() {
  return this.auth.logout();
}


angular.module('wfm.common.apiservices').service("userService", ['authService', '$http', function(authService, $http) {
  var urlPromise = new Promise(function(resolve, reject) {
    $fh.on('fhinit', function() {
      var baseUrl = decodeURIComponent($fh.getCloudURL());
      return resolve(baseUrl);
    });
  });
  return new UserService(authService, $http, urlPromise);
}]);
