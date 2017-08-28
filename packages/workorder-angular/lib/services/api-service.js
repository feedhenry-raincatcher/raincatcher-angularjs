var CONSTANTS = require('../constants');

function WorkorderApiService(config, workorderService, workflowService, resultService, userService) {
  this.workorderService = workorderService;
  this.workflowService = workflowService;
  this.resultService = resultService;
  this.userService = userService;
}

WorkorderApiService.prototype.listWorkorders = function() {
  // FIXME Paginate results
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

WorkorderApiService.prototype.searchWorkorders = function(filter) {
  return this.workorderService.search(filter);
};

WorkorderApiService.prototype.listWorkflows = function() {
  return this.workflowService.list();
};

WorkorderApiService.prototype.readWorkflow = function(workflowId) {
  return this.workflowService.read(workflowId);
};

WorkorderApiService.prototype.readUser = function(userId) {
  return this.userService.readUserById(userId);
};

WorkorderApiService.prototype.getResultByWorkorder = function(workorderId) {
  return this.resultService.readByWorkorder(workorderId);
};

WorkorderApiService.prototype.subscribeToWokorderUpdates = function(functionToCall) {
  if (this.workorderService.subscribeToDatasetUpdates) {
    // Subscribe only when dataset implementation support that method
    this.workorderService.subscribeToDatasetUpdates(functionToCall);
  }
};

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).service(CONSTANTS.WORKORDER_API_SERVICE, ["WORKORDER_CONFIG", "workorderService", "workflowService", "resultService", "userService", function(WORKORDER_CONFIG, workorderService, workflowService, resultService, userService) {

  return new WorkorderApiService(WORKORDER_CONFIG, workorderService, workflowService, resultService, userService);
}]);
