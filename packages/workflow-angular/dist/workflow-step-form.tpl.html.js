var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-step-form.tpl.html',
    '<md-toolbar class="content-toolbar md-primary" ng-show="step">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>Update step</h3>\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Close" ng-click="wfsfController.selectWorkflow($event, workflow)">\n' +
    '      <md-icon md-font-set="material-icons">close</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form name="workflowStepForm" ng-submit="wfsfController.done(workflowStepForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '\n' +
    '<div>\n' +
    '  <md-input-container class="md-block">\n' +
    '    <label>Name</label>\n' +
    '    <input type="text" id="name" name="name" ng-model="wfsfController.model.step.name" required>\n' +
    '    <div ng-messages="workflow.namselectWorkflowe.$error" ng-if="wfsfController.submitted || workflowForm.name.$dirty">\n' +
    '      <div ng-message="required">A name is required.</div>\n' +
    '    </div>\n' +
    '  </md-input-container>\n' +
    '\n' +
    '  <md-list ng-if="wfsfController.stepDefinitions">\n' +
    '    <h3>\n' +
    '      Select step type\n' +
    '    </h3>\n' +
    '    <md-list-item ng-repeat="step in wfsfController.stepDefinitions" ng-click="wfsfController.selectStep($event, step)"\n' +
    '          ng-class="{active: selected.code === step.code}">\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h5>\n' +
    '          {{step.name}}\n' +
    '        </h5>\n' +
    '        {{step.description}}\n' +
    '      </div>\n' +
    '      <md-divider></md-divider>\n' +
    '      </md-list-item>\n' +
    '    </md-list>\n' +
    '  </div>\n' +
    '\n' +
    '  <md-button type="submit" class="md-raised md-primary">{{wfsfController.model.isNew ? \'Add\' : \'Update\'}} step</md-button>\n' +
    '</form>\n' +
    '');
}]);
