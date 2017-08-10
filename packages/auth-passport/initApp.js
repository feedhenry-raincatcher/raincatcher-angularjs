module.exports = function (appName) {
  angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
  });
}