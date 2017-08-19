var Promise = require("bluebird");

function UserService(authService, $http) {
  this.auth = authService;
  this.$http = $http;
}

UserService.prototype.readUser = function readUser() {
  return this.auth.getProfile();
};

// FIXME - Remove and replace with readUser method
UserService.prototype.getProfile = function getProfile() {
  return this.auth.getProfile();
};

UserService.prototype.readUserById = function readUser(id) {
  return this.$http.get("http://localhost:8001/api/users/" + id)
};

UserService.prototype.listUsers = function listUsers(filter) {
  return this.$http
    .get("http://localhost:8001/api/users?filter=" + filter + "&limit=20")
    .then(function(response) {
      if (response.data) {
        return response.data.users;
      }
      return [];
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
  return new UserService(authService, $http);
}]);
