var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-summary.tpl.html',
    '<md-toolbar class="content-toolbar">\n' +
    '  <div class="md-toolbar-tools" ng-if="ctrl.workorder.id">\n' +
    '    <h3>\n' +
    '      Work order : {{ctrl.workorder.title}}\n' +
    '    </h3>\n' +
    '\n' +
    '    <span flex></span>\n' +
    '    <md-button ng-if="ctrl.adminMode" class="md-icon-button" aria-label="Edit" ui-sref="app.workorder.edit({workorderId: ctrl.workorder.id})">\n' +
    '      <md-icon md-font-set="material-icons">edit</md-icon>\n' +
    '    </md-button>\n' +
    '    <md-button ng-if="ctrl.adminMode" class="md-icon-button" aria-label="Delete" ng-click="ctrl.delete($event, ctrl.workorder)">\n' +
    '      <md-icon md-font-set="material-icons">delete</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<div class="wfm-maincol-scroll" ng-if="ctrl.workorder.id">\n' +
    '\n' +
    '  <workorder workorder="ctrl.workorder" status="ctrl.result.status" assignee="ctrl.assignee"></workorder>\n' +
    '\n' +
    '  <md-card ng-if="ctrl.adminMode">\n' +
    '    <md-progress-linear md-mode="determinate" ng-value="ctrl.progress"></md-progress-linear>\n' +
    '    <md-card-title>\n' +
    '      <md-card-title-text>\n' +
    '        <span class="md-headline">Workflow: {{ctrl.workflow.title}}</span>\n' +
    '      </md-card-title-text>\n' +
    '    </md-card-title>\n' +
    '    <md-card-content>\n' +
    '      <p class="md-body-1" ng-if="! ctrl.result.stepResults || ctrl.result.stepResults || isEmpty">\n' +
    '        No workflow submissions.\n' +
    '      </p>\n' +
    '      <workflow-result ng-if="ctrl.adminMode" result="ctrl.result" workflow="ctrl.workflow"></workflow-result>\n' +
    '    </md-card-content>\n' +
    '  </md-card>\n' +
    '\n' +
    '</div><!-- wfm-maincol-scroll -->\n' +
    '\n' +
    '\n' +
    '<md-button ng-if="ctrl.adminMode" class="md-fab" aria-label="New Workorder" ui-sref="app.workorder.new">\n' +
    '  <md-icon md-font-set="material-icons">add</md-icon>\n' +
    '</md-button>\n' +
    '');
}]);
