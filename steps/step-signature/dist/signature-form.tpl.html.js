var ngModule;
try {
  ngModule = angular.module('wfm.signature');
} catch (e) {
  ngModule = angular.module('wfm.signature', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/signature-form.tpl.html',
    '<md-subheader>Provide signature bellow</md-subheader>\n' +
    '<div class="signature-form">\n' +
    '  <canvas tabindex="0"></canvas>\n' +
    '</div>\n' +
    '\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div><!-- workflow-actions-->\n' +
    '');
}]);
