var CONSTANTS = require('../constants');


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', 'WORKFLOW_CONFIG', function($stateProvider, WORKFLOW_CONFIG) {

  var views = {};

  views[WORKFLOW_CONFIG.mainColumnViewId] = {
    template: "<workflow-form></workflow-form>"
  };

  $stateProvider.state('app.workflow.edit', {
    url: '/workflow/:workflowId/edit',
    views: views
  });


  $stateProvider.state('app.workflow.add', {
    url: '/workflows/',
    views: views
  });
}]);