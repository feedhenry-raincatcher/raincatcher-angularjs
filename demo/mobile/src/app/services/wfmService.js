var Promise = require("bluebird");


function WFMApiService(config) {
}

/**
 * Beginning a workflow for a single workorder.
 *
 * @param {string} workorderId - The ID of the workorder to begin the workflow for.
 */
WFMApiService.prototype.beginWorkflow = function (workorderId) {
  return Promise.resolve();
};

/**
 * Getting a summary of the workflow.
 * This wiil get all of the details related to the workorder, including workflow and result data.
 *
 * @param {string} workorderId - The ID of the workorder to get the summary for.
 */
WFMApiService.prototype.workflowSummary = function (workorderId) {
  return Promise.resolve();
};


/**
 *
 * Going to the previous step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to the previous step for
 */
WFMApiService.prototype.previousStep = function (workorderId) {
  return Promise.resolve();
};

/**
 * Completing a single step for a workorder.
 *
 * @param parameters
 * @param {string} parameters.workorderId - The ID of the workorder to complete the step for
 * @param {string} parameters.submission - The submission to save
 * @param {string} parameters.stepCode - The ID of the step to save the submission for
 */
WFMApiService.prototype.completeStep = function (parameters) {
  return Promise.resolve();
};


/**
 * TODO this will be actual step implementation
 *
 * Going to the next step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to next step
 * @returns {Promise}
 */
WFMApiService.prototype.nextStepSubscriber = function (subscriberFunction) {

};

/**
 * TODO this will be actual step implementation
 *
 * Going to the next step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to next step
 * @returns {Promise}
 */
WFMApiService.prototype.previousStepSubscriber = function (subscriberFunction) {
};

angular.module('wfm.common.apiservices').service("wfmService", function () {
  return new WFMApiService();
});
