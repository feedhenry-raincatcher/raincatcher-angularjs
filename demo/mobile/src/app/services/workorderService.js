var Promise = require("bluebird");
var sync = require('fh-js-sdk').sync;

var workflowDataSetId = 'workflow';
var workorderDatasetId = 'workorder';

var doList = Promise.promisify(sync.doList).bind(sync);
var doRead = Promise.promisify(sync.doRead).bind(sync);
var doCreate = Promise.promisify(sync.doCreate).bind(sync);
var doUpdate = Promise.promisify(sync.doUpdate).bind(sync);
var doDelete = Promise.promisify(sync.doDelete).bind(sync);

function WorkorderApiService(syncInitializer) {
  this.workflowModulePromise = syncInitializer.then(function(managers) {
    return managers[workflowDataSetId];
  });
  this.workorderModulePromise = syncInitializer.then(function(managers) {
    return managers[workorderDatasetId];
  });
}

/**
 * Listing all workorders
 *
 * @returns {Promise}
 */
WorkorderApiService.prototype.listWorkorders = function listWorkorders() {
  return this.workflowModulePromise.then(function() {
    return doList(workflowDataSetId);
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
  return this.workflowModulePromise.then(function() {
    return doRead(workflowDataSetId, workorderId);
  });
};

/**
 *
 * Creating a new Workorder
 *
 * @param {object} workorderToCreate - The Workorder To Create
 * @returns {Promise}
 */
WorkorderApiService.prototype.createWorkorder = function createWorkorder(workorder) {
  return this.workorderModulePromise.then(function() {
    return doCreate(workorderDatasetId, workorder);
  });
};

/**
 *
 * Updating A Single Workorder
 *
 * @param {object} workorderToUpdate - The Workorder To Create
 * @param {string} workorderToUpdate.id - The ID of the Workorder To Update
 * @returns {Promise}
 */
WorkorderApiService.prototype.updateWorkorder = function updateWorkorder(workorder) {
  return this.workorderModulePromise.then(function() {
    return doUpdate(workorderDatasetId, workorder.id, workorder);
  });
};

/**
 *
 * Removing A Single Workorder
 *
 * @param {object} workorderToRemove - The Workorder To Remove
 * @param {string} workorderToRemove.id - The ID of the workorder to remove.
 * @returns {Promise}
 */

WorkorderApiService.prototype.removeWorkorder = function removeWorkorder(workorder) {
  return this.workorderModulePromise.then(function() {
    return doDelete(workorderDatasetId, workorder.id, workorder);
  });
};

WorkorderApiService.prototype.listResults = function listResults() {
  return Promise.resolve();
};



/**
 * Utility Function To Read all results and create a map for UI rendering.
 *
 * @returns {*}
 */
WorkorderApiService.prototype.resultMap = function() {
  return this.listResults()
    .then(function(results) {
      var map = {};
      results.forEach(function(result) {
        map[result.workorderId] = result;
      });
      return map;
    });
};

angular.module('wfm.common.apiservices').service("workorderService", ["syncInitializer", function(syncInitializer) {
  return new WorkorderApiService(syncInitializer);
}]);
