var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowDetail', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workflow-detail.tpl.html')
    , controller: "WorkflowDetailController"
    , controllerAs: 'wfdCtrl'
  };
});