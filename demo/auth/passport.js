var $fh = require('fh-js-sdk');
var logger = require('@raincatcher/logger').logger;
var ConsoleLogger = require('@raincatcher/logger').ConsoleLogger;
var setLogger = require('@raincatcher/logger').setLogger;
setLogger(new ConsoleLogger());

$fh.init({}, function() {
  var passport = {
    loadUserProfile: function($http, $window) {
      var req = {
        method: 'GET',
        url: $fh.getCloudURL() + '/profile'
      };
      return $http(req, {withCredentials: true}).then(function (res) {
        return res.data;
      }, function (err) {
        if (err.status === 401) {
          $window.location = $fh.getCloudURL() + '/login';
        }
        if (err.status === 403) {
          logger.error('Forbidden');
        }
        return err;
      });
    },
    hasResourceRole: function(role) {
      // TODO
    },
    logout: function($http, $window) {
      var req = {
        method: 'GET',
        url: $fh.getCloudURL() + '/logout'
      };

      return $http(req, {withCredentials: true}).then(function(res) {
        $window.location = $fh.getCloudURL() + '/login';
      }, function(err) {
        logger.error('An error occurred when logging out', err);
      });
    }
  };

  angular.module('wfm.auth').factory('passport', function() {
    return passport;
  });
}, function(err) {
  logger.error('An error occurred when initializing $fh', err);
});
