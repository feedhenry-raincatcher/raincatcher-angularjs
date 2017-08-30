var config = require("../../config.json").sync;
var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('@raincatcher/logger');
var syncGlobalManager = require("./syncGlobalManager");

var syncPool = {};
var syncManagers;

/**
 * Remove synchronization managers
 */
syncPool.removeManagers = function() {
  if (syncManagers) {
    return Promise.map(syncManagers, function(syncManager) {
      return syncManager.stop();
    }).then(function() {
      syncManagers = null;
    });
  } else {
    return Promise.resolve();
  }
};

/**
 * Create map of sync managers that can be used to do data operations
 */
syncPool.syncManagerMap = function(profileData) {
  if (!profileData) {
    return Promise.resolve({});
  }
  if (syncManagers) {
    return Promise.resolve(syncManagers);
  }

  var filter = {
    'assignee': profileData.id
  };
  syncManagers = {};
  //Initialisation of sync data sets to manage.
  return Promise.all([
    syncGlobalManager.manageDataset(config.datasetIds.workorders, config.syncOptions.workorders, filter, {}),
    syncGlobalManager.manageDataset(config.datasetIds.workflows, config.syncOptions.workflows, {}, {}),
    syncGlobalManager.manageDataset(config.datasetIds.results, config.syncOptions.results, filter, {})
  ]).then(function(managers) {
    managers.forEach(function(syncDatasetManager) {
      syncManagers[syncDatasetManager.datasetId] = syncDatasetManager;
      syncDatasetManager.start(function() { }); //start sync for this dataset
    });
    // Make initial request to server and another one to retrieve results.
    syncPool.forceSync(syncManagers).delay(config.forceSyncDelay*1000).then(function() {
      syncPool.forceSync(syncManagers)
    });
    return syncManagers;
  });
};

/**
 * Force sync to be executed.
 * Note: Due to async behavior of sync we cannot guarantee that response will return latest data.
 */
syncPool.forceSync = function(managers) {
  var promises = [];
  _.forOwn(managers, function(manager) {
    promises.push(
      manager.forceSync()
        .then(function() {
          return manager;
        })
    );
  });
  return Promise.all(promises);
};

/**
 * Service to manage init all of the sync data sets.
 *
 * @param $q
 * @returns {{}}
 * @constructor
 */
function SyncPoolService($http) {
  //Init the sync service
  syncGlobalManager.initSync($http).catch(function(error) {
    logger.getLogger().error("Failed to initialize sync", error);
  });
  return syncPool;
}

angular.module('wfm.sync').service('syncPool', ['$http', SyncPoolService]);
