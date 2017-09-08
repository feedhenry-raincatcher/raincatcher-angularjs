var CONSTANTS = require('../../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowStep', function($templateRequest, $compile) {
  return {
    restrict: 'E'
    , link: function(scope, element) {
      scope.$watch(angular.bind(scope.ctrl, function() {
        return this.stepCurrent;
      }), function(currentStep) {
        element.html(currentStep.templates.form);
        $compile(element.contents())(scope);
      });
    }
  };
});
