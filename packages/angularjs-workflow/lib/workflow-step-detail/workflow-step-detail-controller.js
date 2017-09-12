var CONSTANTS = require('../constants');
var _ = require('lodash');

function WorkflowStepDetailController($scope, WORKFLOW_CONFIG) {
  var stepDefinitions = WORKFLOW_CONFIG.stepDefinitions;
  var step = $scope.step;
  var definition = _.find(stepDefinitions, function(definition) {
    return definition.code === step.code;
  });
  $scope.definition = definition;
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).controller("WorkflowStepDetailController", ['$scope', 'WORKFLOW_CONFIG', WorkflowStepDetailController]);
