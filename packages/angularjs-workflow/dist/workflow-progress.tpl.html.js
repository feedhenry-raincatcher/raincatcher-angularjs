var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-progress.tpl.html',
    '<div class="workflow-progress" ng-class="{close: ctrl.closed}">\n' +
    '\n' +
    '<md-button class="md-icon-button md-warm expand-collapse">\n' +
    '  <md-icon ng-show="ctrl.closed" md-font-set="material-icons" ng-click="ctrl.open()">keyboard_arrow_down</md-icon>\n' +
    '  <md-icon ng-show="!ctrl.closed" md-font-set="material-icons" ng-click="ctrl.close()">keyboard_arrow_up</md-icon>\n' +
    '</md-button>\n' +
    '\n' +
    '<div class="scroll-box">\n' +
    '  <ol>\n' +
    '    <li ng-class="{active: \'-1\' == ctrl.stepIndex, complete: -1 < ctrl.stepIndex}">\n' +
    '      <span class="md-caption"><md-icon md-font-set="material-icons">visibility</md-icon></span>Overview\n' +
    '    </li>\n' +
    '    <li ng-repeat="step in ctrl.steps" ng-class="{active: $index == ctrl.stepIndex, complete: $index < ctrl.stepIndex}">\n' +
    '      <span class="md-caption">{{$index + 1}}</span>{{step.name}}\n' +
    '    </li>\n' +
    '    <li ng-class="{active: ctrl.steps.length <= ctrl.stepIndex, complete: ctrl.steps.length <= ctrl.stepIndex}">\n' +
    '      <span class="md-caption"><md-icon md-font-set="material-icons">done</md-icon></span>Summary\n' +
    '    </li>\n' +
    '  </ol>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '</div><!-- workflow-progress -->\n' +
    '');
}]);
