/**
 * Starts the specfied angular app once document is ready
 * @param appName - The name of the app to be started
 */
module.exports = function (appName) {
  angular.element(document).ready(function() {
    angular.bootstrap(document, [appName]);
  });
}