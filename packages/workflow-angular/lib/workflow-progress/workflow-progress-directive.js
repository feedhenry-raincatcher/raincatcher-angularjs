var CONSTANTS = require('../constants');


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).directive('workflowProgress', function($templateCache, $timeout, WorkflowProgressService) {


  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/workflow-progress.tpl.html')
    , scope: {
      stepIndex: '=',
      workflow: '='
    }
    , link: function(scope, element) {
      $timeout(function() {
        WorkflowProgressService.scrollToActive(element);
      }, 0);
    }
    , controller: "WorkflowProgressController"
    , controllerAs: 'ctrl'
  };
});