var Promise = require("bluebird");

function WorkflowService(workflowManager) {
  this.workflowManager = workflowManager;
}

/**
 * Listing All Workflows
 * @returns {Promise}
 */
WorkflowService.prototype.listWorkflows = function () {
  return workflowManager.listAsync();
};

/**
 * Reading A single workflow
 *
 * @param {string} workflowId
 * @returns {Promise}
 */
WorkflowService.prototype.readWorkflow = function (workflowId) {
  return workflowManager.readAsync(workflowId);
};

/**
 *
 * Updating A Single Workflow
 *
 * @param {object} workflowToUpdate - The Workflow To Update
 * @param {string} workflowToUpdate.id - The ID of the Workorder To Update
 * @returns {Promise}
 */
WorkflowService.prototype.updateWorkflow = function (workflowToUpdate) {
  return workflowManager.updateAsync(workflowToUpdate);
};


/**
 * Creating A Single Workflow
 *
 * @param {object} workflowToCreate - The Workflow To Create
 * @returns {Promise}
 */
WorkflowService.prototype.createWorkflow = function (workflowToCreate) {
  return workflowManager.createAsync(workflowToCreate);
};

/**
 * Removing A Single Workflow
 *
 * @param {object} workflowToRemove - The Workorder To Remove
 * @param {string} workflowToRemove.id - The ID of the workorder to remove.
 * @returns {Promise}
 */
WorkflowService.prototype.removeWorkflow = function (workflowToRemove) {
  return Promise.resolve();
};

angular.module('wfm.common.apiservices').service("workflowService", [function (workflowManager) {
  return new WorkflowService(workflowManager);
}]);
