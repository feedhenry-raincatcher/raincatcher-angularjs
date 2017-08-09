var CONSTANTS = require('../constants');
var _ = require('lodash');


function WorkflowStepFormController($scope, workflowApiService, WORKFLOW_CONFIG, $q, $timeout, $stateParams) {
  var self = this;
  self.submitted = false;
  self.stepDefinitions = WORKFLOW_CONFIG.stepDefinitions;

  var existingStep;

  function setUpStepData() {

    var step = $stateParams.code ? _.find(self.workflow.steps, function(step) {
      return step.code === $stateParams.code;
    }) : {
        templates: {}
      };
    //If there is no step "code", we are adding a step to the workflow...
    if (!$stateParams.code) {
      self.model = {
        step: step,
        workflow: self.workflow,
        isNew: true
      };
    } else {
      //If there is a step "code", we are editing an existing step.....
      self.model = {
        //Whats the deal with copying?
        workflow: self.workflow,
        step: step
      };
      existingStep = self.workflow.steps.filter(function(item) {
        return item.code === step.code;
      }).length > 0;
    }
  }
  workflowApiService.readWorkflow($stateParams.workflowId).then(function(workflow) {
    $timeout(function() {
      self.workflow = workflow;
      setUpStepData();
    });
  });

  self.selectStep = function(event, step) {
    self.model.step.code = step.code
  }

  self.done = function(isValid) {
    self.submitted = true;
    if (isValid) {
      //we check if the step already exist or not, if it exists we remove the old element
      if (existingStep) {
        var updatedStepIndex = _.findIndex(self.workflow.steps, function(step) {
          return step.code === $stateParams.code;
        });
        self.workflow.steps[updatedStepIndex] = self.model.step;
      } else {
        self.workflow.steps.push(self.model.step);
      }

      workflowApiService.updateWorkflow(self.workflow).then(function(updatedWorkflow) {
        self.workflowFlowService.goToWorkflowDetails(updatedWorkflow);
      });
    }
  };

  self.selectWorkflow = function(event, workflow) {
    workflowFlowService.goToWorkflowDetails(workflow);
    event.preventDefault();
    event.stopPropagation();
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowStepFormController", ['$scope', 'workflowApiService', 'WORKFLOW_CONFIG', '$q', '$timeout', '$stateParams', WorkflowStepFormController]);
