var q;
var auth;

function AuthInterceptor($q, authService) {
    q = $q;
    auth = authService;
}

/**
 * Refreshes the Keycloak tokens upon every request
 */
AuthInterceptor.prototype.request = function request(config) {
  var deferred = q.defer();
  if (auth.token) {
    auth.updateToken(5).success(function() {
        config.headers = config.headers || {};
        config.headers.Authorization = 'Bearer ' + auth.token;

        deferred.resolve(config);
    }).error(function() {
        deferred.reject('Failed to refresh token');
    });
  }
  return deferred.promise;
}

module.exports = function(appName) {
  angular.module(appName).service('authInterceptor', function($q, authService) {
    return new AuthInterceptor($q, authService);
  });

  angular.module(appName).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  }]);
};