var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder.tpl.html',
    '<md-list>\n' +
    '  <md-list-item class="md-2-line" ng-show="workorder.id">\n' +
    '    <md-icon md-font-set="material-icons">portrait</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.id}}</h3>\n' +
    '      <p>Workorder id</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.title}}</h3>\n' +
    '      <p>Workorder title</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-divider></md-divider>\n' +
    '\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon>\n' +
    '      <workorder-status ng-class="ctrl.getColorIcon(status)" status="status"></workorder-status>\n' +
    '    </md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{status || "New"}}</h3>\n' +
    '      <p>Status</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line" ng-show="assignee && assignee.name">\n' +
    '    <md-icon md-font-set="material-icons">person</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{assignee.name}}</h3>\n' +
    '      <p>Asignee</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '\n' +
    '  <md-list-item class="md-2-line" ng-show="workorder.workflow">\n' +
    '    <md-icon md-font-set="material-icons">label</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{workorder.workflow.title}} v{{workorder.workflow.version}}</h3>\n' +
    '      <p>Workflow</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
