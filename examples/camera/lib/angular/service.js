'use strict';

var _ = require('lodash');
var camera = require('../camera');

module.exports = 'wfm.camera.service';

angular.module('wfm.camera.service', ['wfm.core.mediator'])

.factory('mobileCamera', function() {
  return camera;
})

.factory('desktopCamera', function($mdDialog) {
  var camera = {};
  camera.capture = function(ev) {
    return $mdDialog.show({
      controller: function CameraCtrl($scope, mediator) {
        $scope.data = null;

        $scope.$watch('data', function() {
          if (! _.isEmpty($scope.data) ) {
            $mdDialog.hide($scope.data);
          }
        });

        mediator.subscribeForScope('wfm:camera:cancel', $scope, function() {
          $mdDialog.cancel('Photo capture cancelled.');
        });
      },
      template: '<camera model="data" autostart="true"></camera>',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false,
      fullscreen: true
    });
  };

  return camera;
})
;
