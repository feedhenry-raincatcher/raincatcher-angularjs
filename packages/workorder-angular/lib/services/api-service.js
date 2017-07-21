var CONSTANTS = require('../constants');
var Promise = require("bluebird");

function WorkorderApiService(config, workorderService) {
  this.workorderService = workorderService;
};

WorkorderApiService.prototype.listWorkorders = function listWorkorders() {
  return this.workorderService.listWorkorders();
};


WorkorderApiService.prototype.readWorkorder = function readWorkorder(workorderId) {
  return Promise.resolve({});
};

WorkorderApiService.prototype.createWorkorder = function createWorkorder(workorderToCreate) {
  return Promise.resolve({});
};

WorkorderApiService.prototype.begin = function begin(workorder) {
  return Promise.resolve({});
};

WorkorderApiService.prototype.updateWorkorder = function updateWorkorder(workorderToUpdate) {
  return Promise.resolve({});
};


WorkorderApiService.prototype.removeWorkorder = function removeWorkorder(workorderToRemove) {
  return Promise.resolve({});
};

WorkorderApiService.prototype.listWorkflows = function listWorkflows() {
  return Promise.resolve([]);
};

WorkorderApiService.prototype.readWorkflow = function readWorkflow(workflowId) {
  return Promise.resolve({});
};


WorkorderApiService.prototype.listResults = function listResults() {
  return Promise.resolve([]);
};


WorkorderApiService.prototype.readUser = function readUser(userId) {
  return Promise.resolve({});
};

WorkorderApiService.prototype.listUsers = function listUsers() {
  return Promise.resolve([]);
};

WorkorderApiService.prototype.subscribeToListUpdated = function subscribeToListUpdated() {
  return Promise.resolve([]);
};



/**
 * Utility Function To Read all results and create a map for UI rendering.
 *
 * @returns {*}
 */
WorkorderApiService.prototype.resultMap = function () {
  return this.listResults()
    .then(function (results) {
      var map = {};
      results.forEach(function (result) {
        map[result.workorderId] = result;
      });
      return map;
    });
};

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).service(CONSTANTS.WORKORDER_API_SERVICE, ["WORKORDER_CONFIG", "workorderService",
  function (WORKORDER_CONFIG, workorderService) {

    return new WorkorderApiService(WORKORDER_CONFIG, workorderService);
  }]);
