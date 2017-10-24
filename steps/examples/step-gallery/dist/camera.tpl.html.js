var ngModule;
try {
  ngModule = angular.module('wfm.step.camera');
} catch (e) {
  ngModule = angular.module('wfm.step.camera', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/camera.tpl.html',
    '<md-subheader>camera</md-subheader>\n' +
    '<md-list>\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text">\n' +
    '      <img src="{{model.data.pictureUri}}" alt="">\n' +
    '      <p>Picture</p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
