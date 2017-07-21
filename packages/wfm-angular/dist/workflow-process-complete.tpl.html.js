var ngModule;
try {
  ngModule = angular.module('wfm.template.directives');
} catch (e) {
  ngModule = angular.module('wfm.template.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-process-complete.tpl.html',
    '<div class="workflow" ng-if="ctrl.workflow">\n' +
    '  <workflow-progress workflow="ctrl.workflow" step-index="ctrl.stepIndex"></workflow-progress>\n' +
    '\n' +
    '  <workorder workorder="ctrl.workorder" status="ctrl.result.status"></workorder>\n' +
    '  <workflow-result result="ctrl.result" workflow="ctrl.workflow"></workflow-result>\n' +
    '</div>\n' +
    '');
}]);
