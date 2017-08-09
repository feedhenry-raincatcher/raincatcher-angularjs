var q;
var auth;

function AuthInterceptor($q, authService) {
    q = $q;
    auth = authService;
}

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

angular.module('wfm-mobile').service('authInterceptor', function($q, authService) {
  return new AuthInterceptor($q, authService);
});

angular.module('wfm-mobile').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);