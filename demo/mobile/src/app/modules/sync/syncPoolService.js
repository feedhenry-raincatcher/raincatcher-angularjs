var config = require('./config.json');
var _ = require('lodash');
var $q = require("q");

var syncGlobalManager = require("./syncGlobalManager");

var syncPool = {};
var syncManagers;

/**
 * Remove synchronization managers
 */
syncPool.removeManagers = function() {
  var promises = _.map(syncManagers, function(syncManager) {
    return syncManager.stop();
  });

  return $q.all(promises).then(function() {
    syncManagers = null;
  });
};

/**
 * Create map of sync managers that can be used to do data operations
 */
syncPool.syncManagerMap = function(profileData) {
  if (!profileData) {
    return $q.when({});
  }
  if (syncManagers) {
    return $q.when(syncManagers);
  }

  var filter = {
    'assignee': profileData.id
  };
  syncManagers = {};
  //Initialisation of sync data sets to manage.
  return $q.all([
    syncGlobalManager.manageDataset(config.datasetIds.workorders, config.syncOptions.workorders, filter, {}),
    syncGlobalManager.manageDataset(config.datasetIds.workflows, config.syncOptions.workflows, {}, {}),
    syncGlobalManager.manageDataset(config.datasetIds.results, config.syncOptions.results, filter, {})
  ]).then(function(managers) {
    managers.forEach(function(syncDatasetManager) {
      syncManagers[syncDatasetManager.datasetId] = syncDatasetManager;
      syncDatasetManager.start(function() {}); //start sync for this dataset
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
  return $q.all(promises);
};

/**
 * Service to manage init all of the sync data sets.
 *
 * @param $q
 * @returns {{}}
 * @constructor
 */
function SyncPoolService($q) {
  //Init the sync service
  syncGlobalManager.initSync().catch(function(err) {
    console.error("Failed to initialize sync");
  });
  return syncPool;
}

angular.module('wfm-mobile').service('syncPool', ['$q', SyncPoolService]);
