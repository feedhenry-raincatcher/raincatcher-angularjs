var CONSTANTS = require('../constants');


function WorkflowStepDetailController($scope, workflowApiService) {
  $scope.definition = workflowApiService.getDefinitionForStep($scope.step);
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowStepDetailController", ['$scope', 'workflowApiService', WorkflowStepDetailController]);
