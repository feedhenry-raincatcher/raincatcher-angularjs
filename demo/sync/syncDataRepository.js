var Promise = require("bluebird");

// Service that is being injected to modules to provide all operations around sync
function SyncApiDataService(datasetId, syncService) {
  this.syncManagerPromise = syncService.then(function(managers) {
    return Promise.promisifyAll(managers[datasetId]);
  });
}

SyncApiDataService.prototype.list = function() {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.listAsync();
  });
};

SyncApiDataService.prototype.read = function(objectId) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.readAsync(objectId);
  });
};

SyncApiDataService.prototype.create = function(objToCreate) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.createAsync(objToCreate);
  });
};

SyncApiDataService.prototype.update = function(objToUpdate) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.updateAsync(objToUpdate);
  });
};

SyncApiDataService.prototype.remove = function(objToRemove) {
  return this.syncManagerPromise.then(function(syncManager) {
    return syncManager.deleteAsync(objToRemove);
  });
};

module.exports = SyncApiDataService;

