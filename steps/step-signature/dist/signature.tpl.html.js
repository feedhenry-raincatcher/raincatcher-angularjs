var ngModule;
try {
  ngModule = angular.module('wfm.signature');
} catch (e) {
  ngModule = angular.module('wfm.signature', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/signature.tpl.html',
    '<md-subheader>Signature</md-subheader>\n' +
    '<img ng-src="{{model.imageURI}}"></img>\n' +
    '');
}]);
