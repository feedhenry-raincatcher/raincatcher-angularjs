var ngModule;
try {
  ngModule = angular.module('wfm.step.camera');
} catch (e) {
  ngModule = angular.module('wfm.step.camera', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/camera-form.tpl.html',
    '<div class="wfm-step-row" class="form-group" ng-form name="stepForm">\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>Picture</label>\n' +
    '    <button ng-click="ctrl.takePicture()">\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '<div class="wfm-step-row" flex-gt-sm>\n' +
    '  <label>Taken picture:</label>\n' +
    '  <img ng-src="{{ctrl.model.data.pictureUri}}" />\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div>\n' +
    '');
}]);
