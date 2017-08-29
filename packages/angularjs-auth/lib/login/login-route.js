var CONSTANTS = require('../constants');

angular.module(CONSTANTS.AUTH_DIRECTIVE_MODULE).config(function($stateProvider) {
  $stateProvider
    .state('app.login', {
      url: '/login',
      data: {
        columns: 2
      },
      views: {
        'content@app': {
          template: '<login></login>'
        }
      }
    });
});