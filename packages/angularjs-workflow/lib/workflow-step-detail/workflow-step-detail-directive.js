var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowStepDetail', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/workflow-step-detail.tpl.html'),
    scope: {
      step : '='
    },
    controller: 'WorkflowStepDetailController'
  };
});
