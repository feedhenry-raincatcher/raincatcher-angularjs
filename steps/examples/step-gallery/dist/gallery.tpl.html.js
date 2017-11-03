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
    '  <md-list-item class="md-2-line" ng-repeat="uri in pictures">\n' +
    '    <md-card>\n' +
    '      <img class="md-card-image" ng-src="{{uri}}" alt="">\n' +
    '    </md-card>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
