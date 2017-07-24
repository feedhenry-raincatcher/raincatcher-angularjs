var Promise = require("bluebird");

function WorkorderApiService(syncService) {
  this.workorderSync = syncService.then(function (managers) {
    return Promise.promisifyAll(managers.workorders);
  });
}

/**
 * Listing all workorders
 *
 * @returns {Promise}
 */
WorkorderApiService.prototype.listWorkorders = function listWorkorders() {
  return this.workorderSync.then(function (workorderManager) {
    return workorderManager.listAsync()
  });
};

/**
 *
 * Reading a single Workorder
 *
 * @param workorderId - The ID of the Workorder To Read
 * @returns {Promise}
 */
WorkorderApiService.prototype.readWorkorder = function readWorkorder(workorderId) {
  return Promise.resolve({});
};

/**
 *
 * Creating a new Workorder
 *
 * @param {object} workorderToCreate - The Workorder To Create
 * @returns {Promise}
 */
WorkorderApiService.prototype.createWorkorder = function createWorkorder(workorderToCreate) {
  return Promise.resolve();
};

/**
 *
 * Updating A Single Workorder
 *
 * @param {object} workorderToUpdate - The Workorder To Create
 * @param {string} workorderToUpdate.id - The ID of the Workorder To Update
 * @returns {Promise}
 */
WorkorderApiService.prototype.updateWorkorder = function updateWorkorder(workorderToUpdate) {
  return Promise.resolve();
};

/**
 *
 * Removing A Single Workorder
 *
 * @param {object} workorderToRemove - The Workorder To Remove
 * @param {string} workorderToRemove.id - The ID of the workorder to remove.
 * @returns {Promise}
 */

WorkorderApiService.prototype.removeWorkorder = function removeWorkorder(workorderManager) {
  return Promise.resolve();
};

WorkorderApiService.prototype.listResults = function listResults() {
  return Promise.resolve();
};



/**
 * Utility Function To Read all results and create a map for UI rendering.
 *
 * @returns {*}
 */
WorkorderApiService.prototype.resultMap = function () {
  return this.listResults()
    .then(function (results) {
      WorkorderApiService.prototype.map = {};
      results.forEach(function (result) {
        map[result.workorderId] = result;
      });
      return map;
    });
};

angular.module('wfm.common.apiservices').service("workorderService", ['syncService', function (syncService) {
  return new WorkorderApiService(syncService);
}]);
