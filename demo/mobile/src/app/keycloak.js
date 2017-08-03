var Keycloak = require('keycloak-js');

// keycloak init config
var initConfig = {onLoad: 'login-required'};

// the keycloak json config
var keycloakJS = Keycloak({
  "realm": "raincatcher",
  "url": "http://localhost:8080/auth",
  "ssl-required": "external",
  "clientId": "raincatcher-mobile",
  "public-client": true,
  "use-resource-role-mappings": true
});

var auth = {};

angular.element(document).ready(function() {
  // Initialise the Keycloak JS Adapter
  keycloakJS.init(initConfig).success(function() {
    console.log("Keycloak Ininitalisation Success");
    auth = keycloakJS;
    // make auth/keycloak JS adapter available to controllers & services in the app
    angular.module('wfm-mobile').factory('Auth', function() {
      return auth;
    });
    // angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
    angular.bootstrap(document, ["wfm-mobile"]);
  }).error(function(err) {
    console.error("Error Initialising Keycloak JS", err);
  });
});

angular.module('wfm-mobile').factory('authInterceptor', function($q, Auth) {
  return {
    request: function(config) {
      var deferred = $q.defer();
      if (Auth.token) {
        Auth.updateToken(5).success(function() {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + Auth.token;

          deferred.resolve(config);
        }).error(function() {
          deferred.reject('Failed to refresh token');
        });
      }
      return deferred.promise;
    }
  };
});

angular.module('wfm-mobile').config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);