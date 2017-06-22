var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowForm', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workflow-form.tpl.html')
    , controller: "WorkflowFormController"
    , controllerAs: 'ctrl'
  };
});