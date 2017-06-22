'use strict';
angular.module('app.home', ['ui.router'])

.config(function($stateProvider) {
  $stateProvider
    .state('app.home', {
      url: '/home',
      views: {
        content: {
          templateUrl: 'app/home/home.tpl.html'
        }
      }
    });
})
;

module.exports = 'app.home';
