var ngModule;
try {
  ngModule = angular.module('wfm.step.signature');
} catch (e) {
  ngModule = angular.module('wfm.step.signature', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/signature.tpl.html',
    '<md-subheader>Signature</md-subheader>\n' +
    '<img ng-src="{{model.imageURI}}"></img>\n' +
    '');
}]);
