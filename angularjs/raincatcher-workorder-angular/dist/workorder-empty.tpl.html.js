var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-empty.tpl.html',
    '<div class="empty-state" layout-padding layout-margin>\n' +
    '  <h2 class="md-title">No workorder selected.</h2>\n' +
    '  <p class="md-body-1">Select a workorder from the menu, or create a new workorder:</p>\n' +
    '  <md-button class="md-raised md-accent" ui-sref="app.workorder.new">New Workorder</md-button>\n' +
    '</div>\n' +
    '');
}]);
