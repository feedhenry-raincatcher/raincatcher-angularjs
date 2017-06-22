'use strict';

/**
 * NOTE: This is only for backward compatibility with the existing demo apps.
 *
 * When this functionality has been moved to modules, then this can be removed.
 *
 * @type {_|exports|module.exports}
 * @private
 */

var _ = require('lodash');

module.exports = 'wfm.workorder.sync';

var workorderClient = require('./client');

function wrapManager($q, $timeout, manager) {
  var wrappedManager = _.create(manager);
  wrappedManager.new = function() {
    var deferred = $q.defer();
    $timeout(function() {
      var workorder = {
        type: 'Job Order'
        , status: 'New'
      };
      deferred.resolve(workorder);
    }, 0);
    return deferred.promise;
  };

  return wrappedManager;
}

angular.module('wfm.workorder.sync', [])
  .factory('workorderSync', function($q, $timeout, mediator) {
    var workorderSync = {};
    workorderSync.createManager = function() {
      workorderSync.manager = workorderSync.manager || wrapManager($q, $timeout, workorderClient(mediator));
      return $q.when(workorderSync.manager);
    };
    workorderSync.removeManager = function() {
      if (workorderSync.manager) {
        return workorderSync.manager.safeStop()
          .then(function() {
            delete workorderSync.manager;
          });
      }
    };
    return workorderSync;
  });
