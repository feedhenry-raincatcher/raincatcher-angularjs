var CONSTANTS = require('../../constants');


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', 'WORKFLOW_CONFIG', function($stateProvider, WORKFLOW_CONFIG) {
  var views = {};
  views[WORKFLOW_CONFIG.mainColumnViewId] = {
    templateProvider: function($templateCache) {
      return $templateCache.get('wfm-template/workflow-process-steps.tpl.html');
    },
    controller: 'WorkflowProcessStepsController as ctrl'
  };

  $stateProvider.state('app.workflowProcess.steps', {
    url: '/steps',
    views: views
  });
}]);