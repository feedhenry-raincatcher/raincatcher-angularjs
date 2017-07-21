var CONSTANTS = require('../constants');

function WorkflowApiService(config) {
  this.workflowService = {};
  this.workorderService = {};
}

/**
 * Listing All Workflows
 * @returns {Promise}
 */
WorkflowApiService.prototype.listWorkflows = function() {
  return this.workflowService.listWorkflows();
};

/**
 * Listing all workorders
 *
 * @returns {Promise}
 */
WorkflowApiService.prototype.listWorkorders = function() {
  return this.workorderService.listWorkorders();
};


/**
 * Reading A single workflow
 *
 * @param {string} workflowId
 * @returns {Promise}
 */
WorkflowApiService.prototype.readWorkflow = function(workflowId) {
  return this.workflowService.readWorkflow(workflowId);
};

/**
 * Reading A single workorder
 *
 * @param {string} workorderId
 * @returns {Promise}
 */
WorkflowApiService.prototype.readWorkorder = function(workorderId) {
  return this.workorderService.readWorkorder(workorderId);
};

/**
 *
 * Updating A Single Workflow
 *
 * @param {object} workflow - The Workflow To Update
 * @param {string} workflow.id - The ID of the Workorder To Update
 * @returns {Promise}
 */
WorkflowApiService.prototype.updateWorkflow = function(workflow) {
  return this.workflowService.updateWorkflow(workflow);
};


/**
 *
 * Creating A Single Workflow
 *
 * @param {object} workflowToCreate - The Workflow To Create
 * @returns {Promise}
 */
WorkflowApiService.prototype.createWorkflow = function(workflow) {
  return this.workflowService.createWorkflow(workflow);
};

/**
 *
 * Removing A Single Workorder
 *
 * @param {object} workflow - The Workflow To Remove
 * @param {string} workflow.id - The ID of the workorder to remove.
 * @returns {Promise}
 */
WorkflowApiService.prototype.removeWorkflow = function(workflow) {
  return this.workflowService.removeWorkflow(workflow);
};

/**
 *
 * Beginning a workflow for a single workorder.
 *
 * @param {string} workorderId - The ID of the workorder to begin the workflow for.
 */
WorkflowApiService.prototype.beginWorkflow = function(workorderId) {
};

/**
 *
 * Getting a summary of the workorder. This wiil get all of the details related to the workorder, including workflow and result data.
 *
 * @param {string} workorderId - The ID of the workorder to get the summary for.
 */
WorkflowApiService.prototype.workflowSummary = function(workorderId) {
};


/**
 *
 * Going to the previous step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to the previous step for
 */
WorkflowApiService.prototype.previousStep = function(workorderId) {

};

/**
 * TODO this will be actual step implementation
 *
 * Going to the next step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to next step
 * @returns {Promise}
 */
WorkflowApiService.prototype.nextStepSubscriber = function(subscriberFunction) {

};

/**
 *
 * TODO this will be actual step implementation
 *
 * Going to the next step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to next step
 * @returns {Promise}
 */
WorkflowApiService.prototype.previousStepSubscriber = function(subscriberFunction) {

};

/**
 *
 * Completing a single step for a workorder.
 *
 * @param parameters
 * @param {string} parameters.workorderId - The ID of the workorder to complete the step for
 * @param {string} parameters.submission - The submission to save
 * @param {string} parameters.stepCode - The ID of the step to save the submission for
 */
WorkflowApiService.prototype.completeStep = function(parameters) {
};

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).service(CONSTANTS.WORKFLOW_API_SERVICE, ['WORKFLOW_CONFIG', function(WORKFLOW_CONFIG) {
  return new WorkflowApiService(WORKFLOW_CONFIG);
}]);
