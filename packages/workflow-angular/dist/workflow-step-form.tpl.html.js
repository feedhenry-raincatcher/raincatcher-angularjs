var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-step-form.tpl.html',
    '<md-toolbar class="content-toolbar md-primary" ng-if="ctrl.model.isNew == false">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>Update step</h3>\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Close" ng-click="ctrl.selectWorkflow($event, ctrl.workflow)">\n' +
    '      <md-icon md-font-set="material-icons">close</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form name="workflowStepForm" ng-submit="ctrl.done(workflowStepForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '  <div>\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label>Name</label>\n' +
    '      <input type="text" id="name" name="name" ng-model="ctrl.model.step.name" required>\n' +
    '      <div ng-messages="ctrl.model.step.name.$error" ng-if="ctrl.submitted || workflowStepForm.name.$dirty">\n' +
    '        <div ng-message="required">A name is required.</div>\n' +
    '      </div>\n' +
    '    </md-input-container>\n' +
    '\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label>Select step type</label>\n' +
    '      <md-select ng-if="ctrl.stepDefinitions" ng-model="ctrl.model.step.code">\n' +
    '        <md-option ng-repeat="step in ctrl.stepDefinitions" ng-value="step.code">\n' +
    '          <b>{{step.name}}</b> - {{step.description}}\n' +
    '        </md-option>\n' +
    '      </md-select>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <md-button type="submit" class="md-raised md-primary">{{ctrl.model.isNew ? \'Add\' : \'Update\'}} step</md-button>\n' +
    '</form>\n' +
    '');
}]);
