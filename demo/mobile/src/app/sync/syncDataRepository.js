var Bluebird = require("bluebird");

/**
 * Service that is being injected to modules to provide all operations around sync
 */
function SyncApiDataService() {
}

/**
 * Set manager to be used by this service
 */
SyncApiDataService.prototype.setManager = function(manager) {
  this.syncManager = manager;
}

SyncApiDataService.prototype.list = function() {
  if (this.syncManager) {
    return this.syncManager.list();
  }
  return Bluebird.resolve([]);
};

SyncApiDataService.prototype.read = function(objectId) {
  if (this.syncManager) {
    return this.syncManager.read(objectId);
  }
  return Bluebird.resolve();
};

SyncApiDataService.prototype.create = function(objToCreate) {
  if (this.syncManager) {
    return this.syncManager.create(objToCreate);
  }
  return Bluebird.resolve();
};

SyncApiDataService.prototype.update = function(objToUpdate) {
  if (this.syncManager) {
    return this.syncManager.update(objToUpdate);
  }
  return Bluebird.resolve();
};

SyncApiDataService.prototype.remove = function(objToRemove) {
  if (this.syncManager) {
    return this.syncManager.delete(objToRemove);
  }
  return Bluebird.resolve();
};

SyncApiDataService.prototype.subscribeToDatasetUpdates = function(methodToCall) {
  if (this.syncManager) {
    return this.syncManager.subscribeToDatasetUpdates(methodToCall);
  }
};

module.exports = SyncApiDataService;

