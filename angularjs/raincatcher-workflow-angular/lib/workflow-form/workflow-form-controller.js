var CONSTANTS = require('../constants');


/**
 * Controller for editing / creating Workflows
 * @param $scope
 * @param workflowMediatorService
 * @param $stateParams
 * @param $q
 * @param mediator
 * @param $timeout
 * @constructor
 */
function WorkflowFormController($scope, workflowMediatorService, $stateParams, $q, mediator, $timeout) {
  var self = this;
  self.model = false;
  self.submitted = false;

  //If there is no workflow ID, then we are creating a new workflow.
  var workflowPromise = $stateParams.workflowId ? workflowMediatorService.readWorkflow($stateParams.workflowId) : $q.when({
    steps: []
  });

  workflowPromise.then(function(workflow) {
    $timeout(function() {
      self.model = workflow;
    });

  });

  self.done = function(isValid) {
    self.submitted = true;
    if (isValid) {
      var hasId = self.model.id || self.model._localuid;
      var createUpdatePromise = hasId ? workflowMediatorService.updateWorkflow(self.model) : workflowMediatorService.createWorkflow(self.model);

      createUpdatePromise.then(function(updatedCreatedWorkflow) {
        mediator.publish(workflowMediatorService.workflowUITopics.getTopic(CONSTANTS.TOPICS.SELECTED), updatedCreatedWorkflow);
      });
    }
  };

  self.selectWorkflow = function(event, workflow) {
    if (workflow.id) {
      mediator.publish(workflowMediatorService.workflowUITopics.getTopic(CONSTANTS.TOPICS.SELECTED), workflow);
    } else {
      mediator.publish(workflowMediatorService.workflowUITopics.getTopic(CONSTANTS.TOPICS.LIST));
    }
    event.preventDefault();
    event.stopPropagation();
  };
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowFormController", ['$scope', 'workflowMediatorService', '$stateParams', '$q', 'mediator', '$timeout', WorkflowFormController]);