var config = require("../../config.json").sync;
var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('@raincatcher/logger');
var syncClient = require("@raincatcher/datasync-client");
var syncNetworkInit = require('./init/syncGlobalNetworkInit');
var DataManager = syncClient.DataManager;
var syncApi = syncClient.sync;


/**
 * Hides complexity of all sync operations and allow to register/unregister datasets
 */
var SyncManager = function(workflowService, workorderService, resultService) {
  this.workflowService = workflowService;
  this.workorderService = workorderService;
  this.resultService = resultService;
  // Contains all dataset managers initialized by this class
  this.syncManagers = [];
}

/**
* Manage sync dataset
*
* @param {*} datasetId
* @param {*} options
* @param {*} queryParams
* @param {*} metaData
*/
SyncManager.prototype.manageDataset = function(datasetId, options, queryParams, metaData) {
  return new Promise(function(resolve, reject) {
    syncApi.manage(datasetId, options, queryParams, metaData, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

/**
 * Remove synchronization managers
 */
SyncManager.prototype.removeManagers = function() {
  if (this.syncManagers) {
    this.syncManagers.forEach(function(syncDatasetManager) {
      syncDatasetManager.safeStop(); //stop sync for this dataset
    });
    this.syncManagers = [];
  }
  return Promise.resolve();
};

/**
 * Create array of sync managers that can be used to do data operations
 */
SyncManager.prototype.syncManagerMap = function(profileData) {
  var self = this;
  if (!profileData) {
    return Promise.resolve({});
  }

  if (this.syncManagers.length !== 0) {
    return Promise.resolve(this.syncManagers);
  }

  var filter = {
    'assignee': profileData.id
  };
  //Initialisation of sync data sets to manage.
  return Promise.all([
    self.manageDataset(config.datasetIds.workorders, config.syncOptions.workorders, filter, {}),
    self.manageDataset(config.datasetIds.workflows, config.syncOptions.workflows, {}, {}),
    self.manageDataset(config.datasetIds.results, config.syncOptions.results, filter, {})
  ]).then(function() {
    var workorderManager = new DataManager(config.datasetIds.workorders);
    var resultsManager = new DataManager(config.datasetIds.results);
    var workflowsManager = new DataManager(config.datasetIds.workflows);

    self.syncManagers.push(workorderManager);
    self.syncManagers.push(resultsManager);
    self.syncManagers.push(workflowsManager);

    self.syncManagers.forEach(function(syncDatasetManager) {
      syncDatasetManager.start(function() { }); //start sync for this dataset
    });

    self.resultService.setManager(resultsManager);
    self.workflowService.setManager(workflowsManager);
    self.workorderService.setManager(workorderManager);

    // Make initial request to server and another one to retrieve results.
    self.forceSync(self.syncManagers).delay(config.forceSyncDelay * 1000).then(function() {
      self.forceSync(self.syncManagers);
    });
    return self.syncManagers;
  });
};

/**
 * Force sync to be executed.
 * Note: Due to async behavior of sync we cannot guarantee that response will return latest data.
 */
SyncManager.prototype.forceSync = function(managers) {
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
function syncGlobalManagerService($http, workflowService, workorderService, resultService, authService) {
  //Init the sync service
  syncNetworkInit.initSync($http).catch(function(error) {
    logger.getLogger().error("Failed to initialize sync", error);
  });
  var syncManager = new SyncManager(workflowService, workorderService, resultService);

  authService.setListener(function(profileData) {
    if (profileData) {
      syncManager.syncManagerMap(profileData);
    } else {
      syncManager.removeManagers();
    }
  });

  return syncManager;
}

angular.module('wfm.sync')
  .service('syncGlobalManager', ['$http', 'workflowService', 'workorderService', 'resultService', 'authService', syncGlobalManagerService]);
