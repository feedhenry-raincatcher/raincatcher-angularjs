
'use strict';

angular.module('app.settings').config(function($stateProvider) {
  $stateProvider
    .state('app.settings', {
      url: '/settings',
      data: {
        columns: 2
      },
      views: {
        content: {
          templateUrl: 'app/settings/settings.tpl.html',
          controller: 'SettingsController as ctrl'
        }
      }
    });
});