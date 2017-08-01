'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');
var keycloakConfig = require('./config/config.json').keycloakConfig;
var Promise = require('bluebird');

var module = angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  require('./services'),
  require('@raincatcher/demo-auth-passport'),
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

var auth = {};

// initialise the keycloak js adapter if keycloak configuration has been specified
if (keycloakConfig) {
  // require keycloak js client adapter
  var Keycloak = require('keycloak-js');

  // keycloak init config
  var initConfig = {onLoad: 'login-required'};

  // the keycloak json config
  var keycloakJS = Keycloak(keycloakConfig);

  angular.element(document).ready(function() {
    // initialise the Keycloak JS Adapter
    keycloakJS.init(initConfig).success(function() {
      auth.keycloak = keycloakJS;

      console.log("Keycloak Ininitalisation Success");

      // load keycloak user profile
      auth.keycloak.loadUserProfile().success(function(profile) {
        auth.keycloak.userProfile = profile;
      }).error(function(err) {
        console.log("Failed to Load User Profile", err);
      });

      auth.keycloak.getUserId = function() {
        var userId = auth.keycloak.userProfile.attributes.id[0];
        return Promise.resolve({"id": userId});
      };

      // make the keycloak JS adapter available to controllers & services in the app
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
        if (Auth.keycloak.token) {
          Auth.keycloak.updateToken(5).success(function() {
            config.headers = config.headers || {};
            config.headers.Authorization = 'Bearer ' + Auth.keycloak.token;

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
} else {
  // use passport authentication
  module.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  });
  angular.element(document).ready(function() {
    module.factory('Auth', function(passport) {
      auth.passport = passport;
      return auth;
    });

    angular.bootstrap(document, ["wfm-mobile"]);
  });
}

require('./initialisation');


