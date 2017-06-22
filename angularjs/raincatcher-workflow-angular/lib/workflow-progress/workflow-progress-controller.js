var CONSTANTS = require('../constants');


/**
 *
 * Controller for displaying the current status of the workflow.
 *
 * @param $scope
 * @param $element
 * @param $timeout
 * @param WorkflowProgressService
 * @constructor
 */
function WorkflowProgressController($scope, $element, $timeout, WorkflowProgressService) {
  var self = this;
  self.workflow = $scope.workflow;
  self.steps = $scope.workflow.steps;
  self.open = function() {
    self.closed = false;
  };
  self.close = function() {
    WorkflowProgressService.scrollToActive($element);
    self.closed = true;
  };
  WorkflowProgressService.parseStepIndex(self, $scope.stepIndex ? parseInt($scope.stepIndex) : 0);

  $scope.$watch('stepIndex', function() {
    WorkflowProgressService.parseStepIndex(self, $scope.stepIndex ? parseInt($scope.stepIndex) : 0);
    self.closed = true;
    $timeout(function() {
      WorkflowProgressService.scrollToActive($element);
    }, 0);
  });
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowProgressController", ['$scope', '$element', '$timeout', 'WorkflowProgressService', WorkflowProgressController]);