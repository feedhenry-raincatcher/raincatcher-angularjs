var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowResult', function($compile) {
  var render = function(scope, element) {
    if (scope.workflow.steps && scope.result) {
      element.children().remove();
      scope.workflow.steps.forEach(function(step, stepIndex) {
        if (scope.result.stepResults && scope.result.stepResults[step.code]) {
          element.append('<md-divider></md-divider>');
          var template = '';
          template = '<workorder-submission-result';
          template += ' result="result.stepResults[\''+step.code+'\']"';
          template += ' step="workflow.steps[\''+stepIndex+'\']"';
          template += '></workorder-submission-result>';
          element.append(template);
        }
      });
      $compile(element.contents())(scope);
    }
  };
  return {
    restrict: 'E'
    , scope: {
      workflow: '='
      , result: '='
    }
    , link: function(scope, element, attrs) {
      render(scope, element, attrs);
    }
  };
});