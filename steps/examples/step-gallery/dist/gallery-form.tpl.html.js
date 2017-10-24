var ngModule;
try {
  ngModule = angular.module('wfm.step.gallery');
} catch (e) {
  ngModule = angular.module('wfm.step.gallery', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/gallery-form.tpl.html',
    '<div class="wfm-step-row" layout="row" layout-align="center" flex-gt-sm ng-repeat="uri in ctrl.model.localPictures">\n' +
    '  <md-card flex>\n' +
    '    <img ng-src="{{uri}}"/>\n' +
    '  </md-card>\n' +
    '</div>\n' +
    '<div class="wfm-step-row" class="form-group" ng-form name="stepForm">\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <md-button class="md-raised" ng-click="ctrl.takePicture()">Take Picture</md-button>\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div>\n' +
    '');
}]);
