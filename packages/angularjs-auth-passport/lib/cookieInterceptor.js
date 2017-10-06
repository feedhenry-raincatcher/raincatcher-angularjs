
/**
* Interceptor that adds cookie to requests (to be used in portal)
*/
module.exports = function setupInterceptor(angularModule) {
  angularModule.config(['$httpProvider', function($httpProvider) {
    // This property needs to be set to true to allow cookies to be sent to the server
    $httpProvider.defaults.withCredentials = true;
  }]);
};



