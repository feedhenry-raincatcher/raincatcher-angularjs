var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-form.tpl.html',
    '<div ng-if="ctrl.model">\n' +
    '\n' +
    '  <md-toolbar class="content-toolbar md-primary">\n' +
    '    <div class="md-toolbar-tools">\n' +
    '      <h3>{{ctrl.model.id ? \'Update\' : \'Create\'}} workflow</h3>\n' +
    '      <span flex></span>\n' +
    '      <md-button class="md-icon-button" aria-label="Close" ng-click="ctrl.selectWorkflow($event, ctrl.model)">\n' +
    '        <md-icon md-font-set="material-icons">close</md-icon>\n' +
    '      </md-button>\n' +
    '    </div>\n' +
    '  </md-toolbar>\n' +
    '\n' +
    '  <div class="wfm-maincol-scroll">\n' +
    '    <form name="workflowForm" ng-submit="ctrl.done(workflowForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '\n' +
    '      <div>\n' +
    '        <md-input-container class="md-block">\n' +
    '          <label>Title</label>\n' +
    '          <input type="text" id="title" name="title" ng-model="ctrl.model.title" required>\n' +
    '          <div ng-messages="workflow.title.$error" ng-if="ctrl.submitted || workflowForm.title.$dirty">\n' +
    '            <div ng-message="required">A title is required.</div>\n' +
    '          </div>\n' +
    '        </md-input-container>\n' +
    '      </div>\n' +
    '\n' +
    '      <md-button type="submit" class="md-raised md-primary">{{ctrl.model.id ? \'Update\' : \'Create\'}} Workflow</md-button>\n' +
    '    </form>\n' +
    '  </div>\n' +
    '</div>\n' +
    '\n' +
    '');
}]);
