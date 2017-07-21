var ngModule;
try {
  ngModule = angular.module('wfm.template.directives');
} catch (e) {
  ngModule = angular.module('wfm.template.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-process-steps.tpl.html',
    '<div class="workflow" >\n' +
    '  <workflow-progress ng-if="ctrl.workflow" workflow="ctrl.workflow" step-index="ctrl.stepIndex"></workflow-progress>\n' +
    '\n' +
    '  <div class="workflow-content">\n' +
    '    <workflow-step ng-if="ctrl.stepCurrent" id="workflow-step" workorder="ctrl.workorder" step="ctrl.stepCurrent"></workflow-step>\n' +
    '  </div>\n' +
    '</div>\n' +
    '');
}]);
