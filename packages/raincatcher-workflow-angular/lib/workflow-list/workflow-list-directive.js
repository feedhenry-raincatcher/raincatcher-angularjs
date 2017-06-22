var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowList', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workflow-list.tpl.html')
    , controller: "WorkflowListController"
    , controllerAs: 'ctrl'
  };
});