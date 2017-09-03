var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-step-detail.tpl.html',
    '<h2 class="md-title">Step: {{step.name}}</h2>\n' +
    '<md-list>\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <md-icon md-font-set="material-icons">label</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{step.name}}</h3>\n' +
    '      <p>Step name</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item class="md-2-line" ng-if="definition">\n' +
    '    <md-icon md-font-set="material-icons">label outline</md-icon>\n' +
    '    <div class="md-list-item-text">\n' +
    '      <h3>{{definition.name}}</h3>\n' +
    '      <h4>{{definition.description}}</h4>\n' +
    '      <p>Step definition</p>\n' +
    '    </div>\n' +
    '  </md-list-item>\n' +
    '  <md-list-item class="md-2-line">\n' +
    '  <md-divider></md-divider>\n' +
    '</md-list>\n' +
    '');
}]);
