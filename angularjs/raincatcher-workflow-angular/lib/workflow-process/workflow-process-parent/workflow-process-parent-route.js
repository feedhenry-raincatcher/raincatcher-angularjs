var CONSTANTS = require('../../constants');


/**
 * This is the parent view for the each of the workflow steps.
 *
 * Each of the views for rendering the workflow steps is based on this abstract route.
 *
 */
angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).config(['$stateProvider', 'WORKFLOW_CONFIG', function($stateProvider, WORKFLOW_CONFIG) {

  var views = { };

  views[WORKFLOW_CONFIG.mainColumnViewId] = {
    //The base view for all workflow steps.
    template: '<div ui-view></div>'
  };

  //Replacing the toolbar view with the workorder details
  views[WORKFLOW_CONFIG.toolbarViewId] = {
    templateProvider: function($templateCache) {
      return $templateCache.get("wfm-template/workflow-process-toolbar.tpl.html");
    },
    controller: 'ProcessToolbarController as ctrl'
  };

  $stateProvider.state('app.workflowProcess', {
    abstract: true,
    url: '/workflow/workorder/:workorderId',
    views: views
  });
}]);