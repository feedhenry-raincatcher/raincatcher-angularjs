var CONSTANTS = require('./constants');

/**
* Interceptor that adds JWT token (to be used in mobile)
*/
module.exports = function setupInterceptor(angularModule) {
  angularModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        'request': function(config) {
          config.headers = config.headers || {};
          var token = localStorage.getItem(CONSTANTS.TOKEN_CACHE_KEY);
          if (token) {
            config.headers.Authorization = 'JWT ' + token;
          }
          return config;
        }
      };
    });
  }]);
};


