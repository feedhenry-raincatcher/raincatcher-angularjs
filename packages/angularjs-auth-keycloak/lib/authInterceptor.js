
var Promise = require('bluebird');

/**
 * Keycloak angular auth interceptor.
 *
 * @param {*} keycloakApi - keycloak js client
 */
function AuthInterceptor(keycloakApi) {
  this.keycloakApi = keycloakApi;
}

/**
 * Refreshes the Keycloak tokens upon every request
 */
AuthInterceptor.prototype.request = function request(config) {
  if (!this.keycloakApi || !this.keycloakApi.token) {
    return Promise.resolve(config);
  }
  return new Promise(function(resolve) {
    this.keycloakApi.updateToken().success(function() {
      config.headers = config.headers || {};
      config.headers.Authorization = 'Bearer ' + this.keycloakApi.token;
      return resolve(config);
    }).error(function() {
      // Intentionally do not fail on tokens when offline
      resolve(config);
    });
  });
};

module.exports = function(angularModule, keycloakApi) {
  angularModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function() {
      return new AuthInterceptor(keycloakApi);
    });
  }]);
};
