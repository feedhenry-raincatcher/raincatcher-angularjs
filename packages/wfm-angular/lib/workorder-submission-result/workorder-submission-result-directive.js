var CONSTANTS = require('../constants');


//TODO: This is a bit odd, might want to reonsider this....
angular.module(CONSTANTS.WORKORDER_DIRECTIVE).directive('workorderSubmissionResult', function($compile) {
  var render = function(scope, element) {
    var template = scope.step.templates.view;
    element.append(template);
    $compile(element.contents())(scope);
  };

  return {
    restrict: 'E',
    scope: {
      result: '=',
      step: '='
    },
    link: function(scope, element, attrs) {
      render(scope, element, attrs);
    }
  };
});