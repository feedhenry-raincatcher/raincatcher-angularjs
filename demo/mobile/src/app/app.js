'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');
var logger = require('@raincatcher/logger');

// Create INFO logger
logger.setLogger(new logger.ClientLogger(2));
var Keycloak = require('keycloak-js');

var module = angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./services'),
  require('@raincatcher/demo-wfm'),
  require('@raincatcher/demo-sync'),
  // Set of the data services
  require('@raincatcher/workflow-angular')({
    mode: "user",
    mainColumnViewId: "content@app"
  }),
  require('@raincatcher/workorder-angular')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  }),
  require('@raincatcher/vehicle-inspection')
]);

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
  // initialise the Keycloak JS Adapter
  keycloakJS.init(initConfig).success(function() {
    auth.provider = keycloakJS;
    auth.provider.name = "keycloak";
    console.log("Keycloak Ininitalisation Success");
    // make auth/keycloak JS adapter available to controllers & services in the app
    module.factory('Auth', function() {
      return auth;
    });
    // angular should be started after Keycloak has initialized otherwise Angular will cause issues with URL Rewrites
    angular.bootstrap(document, ["wfm-mobile"]);
  }).error(function(err) {
    console.error("Error Initialising Keycloak JS", err);
  });
});

module.factory('authInterceptor', function($q, Auth) {
  return {
    request: function(config) {
      var deferred = $q.defer();
      if (Auth.provider.token) {
        Auth.provider.updateToken(5).success(function() {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + Auth.provider.token;

          deferred.resolve(config);
        }).error(function() {
          deferred.reject('Failed to refresh token');
        });
      }
      return deferred.promise;
    }
  };
});

module.factory('errorInterceptor', function($q, Auth) {
  return function(promise) {
    return promise.then(function(response) {
      return response;
    }, function(response) {
      if (response.status === 401) {
        console.log('Session timeout?');
        Auth.provider.logout();
      } else if (response.status === 403) {
        console.log("Forbidden");
      } else if (response.status === 404) {
        console.log("Not found");
      } else if (response.status) {
        if (response.data && response.data.errorMessage) {
          console.log(response.data.errorMessage);
        } else {
          console.log("An unexpected server error has occurred");
        }
      }
      return $q.reject(response);
    });
  };
});

module.config(function($httpProvider) {
  $httpProvider.interceptors.push('errorInterceptor');
  $httpProvider.interceptors.push('authInterceptor');
});

require('./initialisation');


