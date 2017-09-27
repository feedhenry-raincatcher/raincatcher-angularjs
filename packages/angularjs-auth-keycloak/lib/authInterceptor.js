
var q = require('q');

// Global this
var self;

/**
 * Keycloak angular auth interceptor.
 *
 * @param {*} keycloakApi - keycloak js client
 */
function AuthInterceptor(keycloakApi) {
  this.keycloakApi = keycloakApi;
  self = this;
}

/**
 * Refreshes the Keycloak tokens upon every request
 */
AuthInterceptor.prototype.request = function request(config) {
  var deferred = q.defer();
  if (self.keycloakApi.token) {
    self.keycloakApi.updateToken().success(function() {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + self.keycloakApi.token;
      deferred.resolve(config);
    }).error(function() {
      // Intentionally do not fail on tokens when offline
      deferred.resolve(config);
    });
  } else {
    deferred.resolve(config);
  }

  return deferred.promise;
}

module.exports = function(angularModule, keycloakApi) {
  angularModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function() {
      var interceptor = new AuthInterceptor(keycloakApi);

      return new AuthInterceptor(keycloakApi);
    });
  }]);
};
