var Promise = require("bluebird");

// Service that is being injected to modules to provide all operations around sync
function SyncApiDataService(datasetId, syncService) {
  this.syncManagerPromise = syncService.then(function(managers) {
    return managers[datasetId];
  });
}

SyncApiDataService.prototype.list = function() {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.list();
  });
};

SyncApiDataService.prototype.read = function(objectId) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.read(objectId);
  });
};

SyncApiDataService.prototype.create = function(objToCreate) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.create(objToCreate);
  });
};

SyncApiDataService.prototype.update = function(objToUpdate) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.update(objToUpdate);
  });
};

SyncApiDataService.prototype.remove = function(objToRemove) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.delete(objToRemove);
  });
};

SyncApiDataService.prototype.subscribeToDatasetUpdates = function(methodToCall) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.subscribeToDatasetUpdates(methodToCall);
  });
};

module.exports = SyncApiDataService;

