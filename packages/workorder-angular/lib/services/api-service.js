var CONSTANTS = require('../constants');
var Promise = require("bluebird");

function WorkorderApiService(config, workorderService, workflowService) {
  this.workorderService = workorderService;
  this.workflowService = workflowService;
}

WorkorderApiService.prototype.listWorkorders = function listWorkorders() {
  return this.workorderService.listWorkorders();
};


WorkorderApiService.prototype.readWorkorder = function readWorkorder(workorderId) {
  return this.workorderService.readWorkorder(workorderId);
};

WorkorderApiService.prototype.createWorkorder = function createWorkorder(workorder) {
  return this.workorderService.createWorkorder(workorder);
};

WorkorderApiService.prototype.begin = function begin(workorder) {
  return Promise.resolve({});
};

WorkorderApiService.prototype.updateWorkorder = function updateWorkorder(workorder) {
  return this.workorderService.updateWorkorder(workorder);
};


WorkorderApiService.prototype.removeWorkorder = function removeWorkorder(workorder) {
  return this.workorderService.removeWorkorder(workorder);
};

WorkorderApiService.prototype.listWorkflows = function listWorkflows() {
  return this.workflowService.listWorkflows();
};

WorkorderApiService.prototype.readWorkflow = function readWorkflow(workflowId) {
  return this.workflowService.readWorkflow(workflowId);
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

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).service(CONSTANTS.WORKORDER_API_SERVICE, ["WORKORDER_CONFIG", "workorderService", "workflowService", "resultService",
  function(WORKORDER_CONFIG, workorderService, workflowService, resultService) {
    return new WorkorderApiService(WORKORDER_CONFIG, workorderService, workflowService, resultService);
  }]);
