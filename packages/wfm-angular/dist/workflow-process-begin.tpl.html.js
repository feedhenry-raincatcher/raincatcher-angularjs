var ngModule;
try {
  ngModule = angular.module('wfm.template.directives');
} catch (e) {
  ngModule = angular.module('wfm.template.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-process-begin.tpl.html',
    '<div class="workflow" ng-if="ctrl.workflow">\n' +
    '  <workflow-progress workflow="ctrl.workflow" step-index="-1"></workflow-progress>\n' +
    '\n' +
    '  <workorder workorder="ctrl.workorder" status="ctrl.status"></workorder>\n' +
    '  <div ng-if="ctrl.notCompleted" class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '    <md-button ng-click="ctrl.begin()" class="md-primary">\n' +
    '      <span ng-if="ctrl.stepIndex === 0">Begin Workflow</span>\n' +
    '      <span ng-if="ctrl.stepIndex > 0 && ctrl.stepIndex < ctrl.workflow.steps.length">Continue Workflow</span>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '  <workflow-result ng-if="ctrl.result" result="ctrl.result" workflow="ctrl.workflow"></workflow-result>\n' +
    '</div>\n' +
    '');
}]);
