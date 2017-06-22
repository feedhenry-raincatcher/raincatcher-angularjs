var angular = require('angular');
var _ = require('lodash');
var config = require('../config.json');


/**
 *
 * Service to manage initialising and removing synchronisation processes for:
 *
 * - workorders
 * - workflows
 * - workflow results
 *
 * @param $q
 * @param mediator
 * @param workorderSync
 * @param workflowSync
 * @param resultSync
 * @param syncService
 * @returns {{}}
 */
function SyncPoolService($q, mediator, workorderSync, workflowSync, syncService) {
  var syncPool = {};
  var syncManagers;

  //Initialising the sync service - This is the global initialisation
  syncService.init(window.$fh, config.syncOptions.global);

  syncPool.removeManagers = function() {
    var promises = _.map(syncManagers, function(syncManager) {
      return syncManager.stop();
    });

    return $q.all(promises).then(function() {
      syncManagers = null;
    });
  };

  syncPool.syncManagerMap = function(profileData) {
    if (! profileData) {
      return $q.when({});
    }

    if (syncManagers) {
      return $q.when(syncManagers);
    }

    syncManagers = {};

    //Initialisation of sync data sets to manage.
    return $q.all([
      syncService.manage(config.datasetIds.workorders, config.syncOptions.workorders, {}, {}),
      syncService.manage(config.datasetIds.workflows, config.syncOptions.workflows, {}, {}),
      syncService.manage(config.datasetIds.results, config.syncOptions.results, {}, {})
    ]).then(function(managers) {
      managers.forEach(function(managerWrapper) {
        syncManagers[managerWrapper.manager.datasetId] = managerWrapper;
        managerWrapper.start(); //start sync
      });
      syncManagers.workorders.manager.publishRecordDeltaReceived(mediator);
      return syncManagers;
    });
  };

  syncPool.forceSync = function(managers) {
    var promises = [];
    _.forOwn(managers, function(manager) {
      promises.push(
        manager.forceSync()
          .then(manager.waitForSync)
          .then(function() {
            return manager;
          })
      );
    });
    return $q.all(promises);
  };

  return syncPool;
}

angular.module('app').service('syncPool', ["$q", "mediator", "workorderSync", "workflowSync", "syncService", SyncPoolService]);