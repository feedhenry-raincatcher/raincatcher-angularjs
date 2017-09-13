var CONSTANTS = require('../constants');
var _ = require('lodash');
var shortid = require('shortid');

function WorkflowStepFormController($scope, workflowService, workflowFlowService, WORKFLOW_CONFIG, $stateParams, $q) {
  var self = this;
  self.submitted = false;
  self.stepDefinitions = WORKFLOW_CONFIG.stepDefinitions;

  workflowService.onBeforeUpdate(function(workflow) {
    workflow.version = workflow.version + 1;
  });

  function setUpStepData(workflow) {
    self.workflow = workflow;
    if (!$stateParams.code) {
      self.model = {
        step: {},
        workflow: self.workflow,
        isNew: true
      };
    } else {
      self.model = {
        step: _.find(self.workflow.steps, function(step) {
          return step.code === $stateParams.code;
        }),
        workflow: self.workflow,
        isNew: false
      };
    }
  }
  if ($scope.workflow) {
    setUpStepData($scope.workflow);
  } else {
    // if workflow is not supplied, get from service
    $q.when(workflowService.read($stateParams.workflowId))
      .then(setUpStepData);
  }

  self.done = function(isValid) {
    self.submitted = true;
    if (isValid) {
      var definition = _.find(self.stepDefinitions, function(definition) {
        return definition.code === self.model.step.code;
      });
      // Create a clone of model.step and merge with properties from the step definition
      var stepData = _.assign({}, definition, self.model.step);
      // Assign id to step so it can be referenced without using code
      stepData.id = shortid.generate();

      self.model.step = {};
      //we check if the step already exist or not, if it exists we remove the old element
      if (self.model.isNew) {
        self.workflow.steps.push(stepData);
      } else {
        var existingStepIndex = _.findIndex(self.workflow.steps, function(step) {
          return step.code === $stateParams.code;
        });
        self.workflow.steps[existingStepIndex] = stepData;
      }

      $q.when(workflowService.update(self.workflow)).then(function(updatedWorkflow) {
        workflowFlowService.goToWorkflowDetails(updatedWorkflow);
      });
    }
  };

  self.selectWorkflow = function(event, workflow) {
    workflowFlowService.goToWorkflowDetails(workflow);
    event.preventDefault();
    event.stopPropagation();
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowStepFormController", [
  '$scope',
  'workflowService',
  'workflowFlowService',
  'WORKFLOW_CONFIG',
  '$stateParams',
  '$q',
  WorkflowStepFormController]);
