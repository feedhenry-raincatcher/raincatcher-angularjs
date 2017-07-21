var CONSTANTS = require('../constants');

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', 'WORKFLOW_CONFIG', function($stateProvider, WORKFLOW_CONFIG) {

  var views = {
  };

  views[WORKFLOW_CONFIG.listColumnViewId] = {
    template: '<workflow-list></workflow-list>'
  };

  views[WORKFLOW_CONFIG.mainColumnViewId] = {
    template: '<workflow-detail></workflow-detail>'
  };

  $stateProvider.state('app.workflow.detail', {
    url: '/workflow/:workflowId',
    views: views
  });
}]);