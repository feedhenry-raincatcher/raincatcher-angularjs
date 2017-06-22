var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-empty.tpl.html',
    '<div class="empty-state" layout-padding layout-margin>\n' +
    '  <h2 class="md-title">No workflow selected.</h2>\n' +
    '  <p class="md-body-1">Select a workflow from the menu, or create a new workflow:</p>\n' +
    '  <md-button class="md-raised md-accent" ui-sref="app.workflow.add">New Workflow</md-button>\n' +
    '</div>\n' +
    '');
}]);
