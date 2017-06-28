var CONSTANTS = require('../constants');

function WorkorderApiService() {
};

WorkorderApiService.prototype.listWorkorders = function listWorkorders() {
  return;
};

WorkorderApiService.prototype.readWorkorder = function readWorkorder(workorderId) {
  return;
};

WorkorderApiService.prototype.createWorkorder = function createWorkorder(workorderToCreate) {
  return;
};

WorkorderApiService.prototype.begin = function begin(workorder) {
  return;
};

WorkorderApiService.prototype.updateWorkorder = function updateWorkorder(workorderToUpdate) {
  return;
};


WorkorderApiService.prototype.removeWorkorder = function removeWorkorder(workorderToRemove) {
  return;
};

WorkorderApiService.prototype.listWorkflows = function listWorkflows() {
  return;
};

WorkorderApiService.prototype.readWorkflow = function readWorkflow(workflowId) {
  return;
};


WorkorderApiService.prototype.listResults = function listResults() {
  return;
};


WorkorderApiService.prototype.readUser = function readUser(userId) {
  return;
};

WorkorderApiService.prototype.listUsers = function listUsers() {
  return;
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

angular.module('wfm.workorder.apiservices', []).service(CONSTANTS.WORKORDER_API_SERVICE, ["WORKORDER_CONFIG", function (WORKORDER_CONFIG) {
  return new WorkorderApiService(WORKORDER_CONFIG);
}]);

module.exports = 'wfm.workorder.apiservices'
