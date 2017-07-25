var Promise = require("bluebird");
var CONSTANTS = require('./constants');
var _ = require('lodash');

function WFMApiService(workorderService, workflowService, resultService) {
  this.workorderService = workorderService;
  this.workflowService = workflowService;
  this.resultService = resultService;
}

/**
 * Beginning a workflow for a single Workorder.
 *
 * @param {string} workorderId - The ID of the workorder to begin the workflow for.
 */
WFMApiService.prototype.beginWorkflow = function(workorderId) {
  return this.workorderSummary(workorderId).then(function(summary) {
    var workorder = summary.workorder;
    var workflow = summary.workflow;
    var result = summary.result || createNewResult(workorderId, workorder.assignee);

    //When the result has been read/created, then we can move on.
    return Promise.resolve(result).then(function(result) {
      //Now we check the current status of the workflow to see where the next step should be.
      var stepReview = executeStepReview(workflow.steps, result);

      result.nextStepIndex = stepReview.nextStepIndex;
      result.status = checkStatus(workorder, workflow, result);

      //We now have the current status of the workflow for this workorder, the begin step is now complete.
      return {
        workorder: workorder,
        workflow: workflow,
        result: result,
        nextStepIndex: result.nextStepIndex,
        step: result.nextStepIndex > -1 ? workflow.steps[result.nextStepIndex] : workflow.steps[0]
      };
    });
  });
};

function createNewResult(workorderId, assignee) {
  return Promise.resolve({
    status: CONSTANTS.STATUS.NEW_DISPLAY,
    nextStepIndex: 0,
    workorderId: workorderId,
    assignee: assignee,
    stepResults: {}
  });
}

/**
 * This function checks each of the result steps to determine if the workflow is complete,
 * and if not, what is the next step in the workflow to display to the user.
 *
 * @param {object} steps
 * @param {object} result
 * @returns {{nextStepIndex: number, complete: *}}
 */
function executeStepReview(steps, result) {
  // See https://github.com/feedhenry-raincatcher/raincatcher-workflow/blob/b515e8acefad4bc50a7cc281863e2176c8babbed/lib/client/workflow-client/workflowClient.js
  var nextIncompleteStepIndex = 0;
  var complete = false;

  //If there is no result, then the first step is the next step.
  if (result && result.stepResults && result.stepResults.length !== 0) {
    nextIncompleteStepIndex = _.findIndex(steps, function(step) {
      //The next incomplete step is the step with no entry or it's not complete yet.
      return !result.stepResults[step.code] || result.stepResults[step.code].status !== CONSTANTS.STATUS.COMPLETE;
    });

    if (nextIncompleteStepIndex === -1) {
      complete = true;
      nextIncompleteStepIndex = steps.length;
    }
  }
  return {
    nextStepIndex: nextIncompleteStepIndex,
    complete: complete // false is any steps are "pending"
  };
}

/**
 * Checking the status of a workorder
 *
 * @param {object} workorder  - The workorder to check status
 * @param {object} workflow   - The workflow to check status
 * @param {object} result     - The result to check status
 * @returns {*}
 */
function checkStatus(workorder, workflow, result) {
  var status;
  var stepReview = executeStepReview(workflow.steps, result);
  if (stepReview.nextStepIndex >= workflow.steps.length - 1 && stepReview.complete) {
    status = CONSTANTS.STATUS.COMPLETE_DISPLAY;
  } else if (!workorder.assignee) {
    status = CONSTANTS.STATUS.UNASSIGNED_DISPLAY;
  } else if (stepReview.nextStepIndex < 0) {
    status = CONSTANTS.STATUS.NEW_DISPLAY;
  } else {
    status = CONSTANTS.STATUS.PENDING_DISPLAY;
  }
  return status;
}



/**
 * Getting a summary of the workflow.
 * This wiil get all of the details related to the workorder, including workflow and result data.
 *
 * @param {string} workorderId - The ID of the workorder to get the summary for.
 * @return {{workflow: Workflow, workorder: Workorder, result: Result}}
 * An object containing all the major entities related to the workorder
 */
WFMApiService.prototype.workorderSummary = function(workorderId) {
  var self = this;
  return this.workorderService.read(workorderId)
    .then(function(workorder) {
      return Promise.all([
        self.workflowService.read(workorder.workflowId),
        self.resultService.readByWorkorder(workorderId)
      ]).then(function(response) {
        var workflow = response[0];
        var result = response[1];
        return {
          workflow: workflow,
          workorder: workorder,
          result: result
        };
      });
    });
};


/**
 *
 * Going to the previous step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to the previous step for
 */
WFMApiService.prototype.previousStep = function(workorderId) {
  var self = this;
  return this.workorderSummary(workorderId).then(function(summary) {
    var workorder = summary.workorder;
    var workflow = summary.workflow;
    var result = summary.result;

    if (!result) {
      //No result exists, The workflow should have been started
      return Promise.reject(new Error("No result exists for workflow " + workorderId + ". The workflow back topic can only be used for a workflow that has begun"));
    }

    // -1 is a special value for 'no next step'
    result.nextStepIndex = _.min([result.nextStepIndex - 1, -1]);

    return self.resultService.update(result).then(function() {
      return {
        workorder: workorder,
        workflow: workflow,
        result: result,
        nextStepIndex: result.nextStepIndex,
        step: result.nextStepIndex > -1 ? workflow.steps[result.nextStepIndex] : null
      };
    });
  });
};

/**
 * Completing a single step for a workorder.
 *
 * @param parameters
 * @param {string} parameters.workorderId - The ID of the workorder to complete the step for
 * @param {string} parameters.submission - The submission to save
 * @param {string} parameters.stepCode - The ID of the step to save the submission for
 */
WFMApiService.prototype.completeStep = function(parameters) {
  var self = this;
  var workorderId = parameters.workflowId;
  var stepCode = parameters.stepCode;
  var submission = parameters.submission;
  return this.userClient.readUser().then(function(profileData) {
    return self.getWorkorderSummary(parameters.workorderId).then(function(workorderSummary) {
      var workorder = workorderSummary[0];
      var workflow = workorderSummary[1];
      var result = workorderSummary[2];

      if (!result) {
        //No result exists, The workflow should have been started
        return Promise.reject(new Error("No result exists for workorder " + workorderId + ". The workflow done topic can only be used for a workflow that has begun"));
      }

      var step = _.find(workflow.steps, function(step) {
        return step.code === stepCode;
      });

      //If there is no step, then this step submission is invalid.
      if (!step) {
        //No result exists, The workflow should have been started
        return Promise.reject(new Error("Invalid step to assign completed data for workorder " + workorderId + " and step code " + stepCode));
      }

      //Got the workflow, now we can create the step result.
      var stepResult = {
        step: step,
        submission: submission,
        type: CONSTANTS.STEP_TYPES.STATIC,
        status: CONSTANTS.STATUS.COMPLETE,
        timestamp: new Date().getTime(),
        submitter: profileData.id
      };

      //The result needs to be updated with the latest step results
      result.stepResults = result.stepResults || {};
      result.stepResults[step.code] = stepResult;
      result.status = checkStatus(workorder, workflow, result);
      result.nextStepIndex = executeStepReview(workflow.steps, result).nextStepIndex;

      return self.resultService.update(result).then(function() {
        //Result update complete, we can now publish the done topic for the step complete with the details of the next step for the user.
        return {
          workorder: workorder,
          workflow: workflow,
          result: result,
          nextStepIndex: result.nextStepIndex,
          step: result.nextStepIndex > -1 ? workflow.steps[result.nextStepIndex] : workflow.steps[0]
        };
      });
    });
  });
};

angular.module('wfm.common.apiservices').service("wfmService", ["workorderService", "workflowService", "resultService", function(workorderService, workflowService, resultService) {
  return new WFMApiService(workorderService, workflowService, resultService);
}]);
