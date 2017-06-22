var CONSTANTS = require('../../constants');


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', function($stateProvider) {

  $stateProvider.state('app.workflowProcess.begin', {
    url: '/begin',
    templateProvider: function($templateCache) {
      return $templateCache.get('wfm-template/workflow-process-begin.tpl.html');
    },
    controller: 'WorkflowProcessBeginController as ctrl'
  });

  $stateProvider
    .state('app.workflowProcess.complete', {
      url: '/complete',
      templateProvider: function($templateCache) {
        return $templateCache.get('wfm-template/workflow-process-complete.tpl.html');
      },
      controller: 'WorkflowProcessBeginController as ctrl'
    });
}]);