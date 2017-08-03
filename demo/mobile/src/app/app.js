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
    auth = keycloakJS;
    auth.name = "keycloak";
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

module.config(function($httpProvider) {
  $httpProvider.interceptors.push('errorInterceptor');
  $httpProvider.interceptors.push('authInterceptor');
});

require('./initialisation');


