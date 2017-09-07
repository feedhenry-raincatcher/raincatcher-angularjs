var Bluebird = require("bluebird");

/**
 * Service that is being injected to modules to provide all operations around sync
 */
function SyncApiDataService() {
  this.managerPromise = Bluebird.defer();
}

/**
 * Set manager to be used by this service
 */
SyncApiDataService.prototype.setManager = function(manager) {
   this.managerPromise.resolve(manager);
}

SyncApiDataService.prototype.list = function() {
   return this.managerPromise.promise.then(function(syncManager){
      return syncManager.list();
   });
};

SyncApiDataService.prototype.read = function(objectId) {
  return this.managerPromise.promise.then(function(syncManager){
    return syncManager.read(objectId);
  });
};

SyncApiDataService.prototype.create = function(objToCreate) {
  return this.managerPromise.promise.then(function(syncManager){
    return syncManager.create(objToCreate);
  });
};

SyncApiDataService.prototype.update = function(objToUpdate) {
  return this.managerPromise.promise.then(function(syncManager){
    return syncManager.update(objToUpdate);
  });
};

SyncApiDataService.prototype.remove = function(objToRemove) {
  return this.managerPromise.promise.then(function(syncManager){
    return syncManager.delete(objToRemove);
  });
};

SyncApiDataService.prototype.subscribeToDatasetUpdates = function(methodToCall) {
  return this.managerPromise.promise.then(function(syncManager){
    return syncManager.subscribeToDatasetUpdates(methodToCall);
  });
};

module.exports = SyncApiDataService;

