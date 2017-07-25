var CONSTANTS = require('../constants');

function WorkorderApiService(config, workorderService, workflowService, resultService, userService, wfmService) {
  this.workorderService = workorderService;
  this.workflowService = workflowService;
  this.resultService = resultService;
  this.wfmService = wfmService;
}

WorkorderApiService.prototype.listWorkorders = function() {
  return this.workorderService.list();
};

WorkorderApiService.prototype.readWorkorder = function(workorderId) {
  return this.workorderService.read(workorderId);
};

WorkorderApiService.prototype.createWorkorder = function(workorderToCreate) {
  return this.workorderService.create(workorderToCreate);
};

WorkorderApiService.prototype.updateWorkorder = function(workorderToUpdate) {
  return this.workorderService.update(workorderToUpdate);
};


WorkorderApiService.prototype.removeWorkorder = function(workorderToRemove) {
  return this.workorderService.remove(workorderToRemove);
};

WorkorderApiService.prototype.listWorkflows = function() {
  return this.workflowService.list();
};

WorkorderApiService.prototype.readWorkflow = function(workflowId) {
  return this.workflowService.read(workflowId);
};


WorkorderApiService.prototype.listResults = function() {
  return this.resultService.list();
};

WorkorderApiService.prototype.readUser = function(userId) {
  return this.userService.readUser(userId);
};

WorkorderApiService.prototype.listUsers = function() {
  return this.userService.listUsers();
};

WorkorderApiService.prototype.begin = function(workorder) {
  return this.wfmService.beginWorkflow(workorder);
};

WorkorderApiService.prototype.subscribeToListUpdated = function() {
  // TODO sync streams
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

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).service(CONSTANTS.WORKORDER_API_SERVICE, ["WORKORDER_CONFIG", "workorderService", "workflowService", "resultService", "userService", "wfmService", function(WORKORDER_CONFIG, workorderService, workflowService, resultService, userService, wfmService) {

  return new WorkorderApiService(WORKORDER_CONFIG, workorderService, workflowService, resultService, userService, wfmService);
}]);
