var Promise = require("bluebird");

function WorkorderApiService() {
};

/**
 * Listing all workorders
 *
 * @returns {Promise}
 */
WorkorderApiService.prototype.listWorkorders = function listWorkorders() {
  return Promise.resolve([{
    id: 'rkX1fdSH',
    workflowId: 'SyVXyMuSr',
    assignee: 'rkX1fdSH',
    type: 'Job Order',
    title: 'Footpath in disrepair',
    status: 'New',
    startTimestamp: '',
    finishTimestamp: '',
    address: '1795 Davie St, Vancouver, BC V6G 2M9',
    location: [49.287227, -123.141489],
    summary: 'Please remove damaged element and return to the base'
  }]);
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

WorkorderApiService.prototype.removeWorkorder = function removeWorkorder(workorderToRemove) {
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

angular.module('wfm.common.apiservices', []).service("workorderService", function () {
  return new WorkorderApiService();
});
