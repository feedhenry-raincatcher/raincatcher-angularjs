var ngModule;
try {
  ngModule = angular.module('wfm.step.camera');
} catch (e) {
  ngModule = angular.module('wfm.step.camera', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/camera-form.tpl.html',
    '<p class="wfm-step-row">Please register details</p>\n' +
    '<!-- Three field form -->\n' +
    '<div class="wfm-step-row" class="form-group" ng-form name="stepForm">\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>Picture</label>\n' +
    '    <!-- Customise change ng-model ctrl.model to own variable -->\n' +
    '    <button ng-click="ctrl.takePicture()">\n' +
    '  </md-input-container>\n' +
    '  <md-input-container class="md-block" flex-gt-sm>\n' +
    '    <label>Taken picture:</label>\n' +
    '    <img ng-src="{{model.data.pictureUri}}" />\n' +
    '  </md-input-container>\n' +
    '</div>\n' +
    '\n' +
    '<md-divider></md-divider>\n' +
    '\n' +
    '\n' +
    '<div class="workflow-actions md-padding md-whiteframe-z4">\n' +
    '  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>\n' +
    '  <md-button class="md-primary" ng-disabled="stepForm.$invalid || stepForm.$pristine" ng-click="ctrl.done($event)">Continue</md-button>\n' +
    '</div>\n' +
    '');
}]);
