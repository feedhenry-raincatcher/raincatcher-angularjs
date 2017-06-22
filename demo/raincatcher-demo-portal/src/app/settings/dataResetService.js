var q = require('q');

/**
 *
 * A service for resetting all of the data for the portal application.
 *
 * WARNING: THIS IS INTENDED FOR DEMO PURPOSES ONLY!! DO NOT INCLUDE THIS IN A PRODUCTION APPLICATION!!
 */

function DataResetService($fh) {
  this.$fh = $fh;
}

/**
 *
 * Resetting all data in the application to the original data sets.
 *
 * @returns {*}
 */
DataResetService.prototype.resetData = function() {
  var options = {
    path: '/admin/data',
    method: 'delete',
    contentType: 'application/json'
  };

  var resetDataDefer = q.defer();
  this.$fh.cloud(options, function(resetDataResponse) {
    resetDataDefer.resolve(resetDataResponse);
  }, function(message) {
    var cloudError = new Error(message);
    resetDataDefer.reject(cloudError);
  });
  return resetDataDefer.promise;
};

angular.module('app.settings').service('DataResetService', ['$fh', function($fh) {
  return new DataResetService($fh);
}]);