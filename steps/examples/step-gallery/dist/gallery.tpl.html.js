var ngModule;
try {
  ngModule = angular.module('wfm.step.gallery');
} catch (e) {
  ngModule = angular.module('wfm.step.gallery', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/gallery.tpl.html',
    '<md-subheader>Gallery</md-subheader>\n' +
    '<md-list>\n' +
    '  <md-list-item class="md-2-line">\n' +
    '    <div class="md-list-item-text" ng-repeat="uri in pictures">\n' +
    '      <img ng-src="{{uri}}" alt="">\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
