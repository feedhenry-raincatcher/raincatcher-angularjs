var CONSTANTS = require('../constants');
var _ = require('lodash');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowResult', function($compile) {
  function render(scope, element) {
    var workflow = scope.workflow;
    var results = scope.results;
    if (workflow.steps && results) {
      element.children().remove();
      results.forEach(function(result, resultIndex) {
        debugger;
        var stepIndex = _.findIndex(workflow.steps, function(step) {
          return step.id === result.stepId;
        });
        if (!_.isUndefined(stepIndex)) {
          element.append('<md-divider></md-divider>');
          var template = '';
          template = '<workorder-submission-result';
          template += ' result="results[' + resultIndex + ']"';
          template += ' step="workflow.steps[\''+stepIndex+'\']"';
          template += '></workorder-submission-result>';
          element.append(template);
        }
      });
      $compile(element.contents())(scope);
    }
  }
  return {
    restrict: 'E',
    scope: {
      workflow: '=',
      results: '='
    },
    link: render
  };
});
