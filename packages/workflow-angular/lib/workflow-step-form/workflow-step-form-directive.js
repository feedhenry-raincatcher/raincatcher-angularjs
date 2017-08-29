var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowStepForm', function($templateCache) {
  return {
    restrict: 'E',
    template: $templateCache.get('wfm-template/workflow-step-form.tpl.html'),
    controller: "WorkflowStepFormController",
    controllerAs: 'ctrl'
  };
});
