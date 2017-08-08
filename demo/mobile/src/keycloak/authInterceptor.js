var q;
var auth;

function AuthInterceptor($q, Auth) {
    q = $q;
    auth = Auth;
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

angular.module('wfm-mobile').service('authInterceptor', function($q, Auth) {
  return new AuthInterceptor($q, Auth);
});

angular.module('wfm-mobile').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);