'use strict';

var Camera = require('../Camera');

/**
 * Initializer for the Camera step
 * @param {cameraOptionsBuilder} cameraOptionsBuilder A function to build additional options for the cordova camera
 */
function initModule(cameraOptionsBuilder) {
  var moduleName = 'wfm.step.camera';
  var ngModule = angular.module(moduleName, []);

  require('../../dist');

  ngModule.directive('camera', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/camera.tpl.html')
      , controller: function($scope) {
        $scope.model = $scope.result.submission;
      },
      controllerAs: 'ctrl'
    };
  });

  ngModule.directive('cameraForm', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/camera-form.tpl.html')
      , controller: function($scope) {
        var self = this;

        self.camera = new Camera(cameraOptionsBuilder);

        self.model = {};
        self.parentController = $scope.$parent;
        self.back = function(event) {
          self.parentController.ctrl.triggerBackStep(self.model);
          event.preventDefault();
          event.stopPropagation();
        };
        self.done = function(event) {
          self.parentController.ctrl.triggerCompleteStep(self.model);
          event.preventDefault();
          event.stopPropagation();
        };

        self.displayImage = function(uri) {
          self.model.data = {};
          self.model.data.pictureUri = uri;
        };
        self.takePicture = function() {
          self.camera.capture().then(function(uri) {
            window.resolveLocalFileSystemURL(uri, function(entry) {

              // TODO: Here we would move the file to the storage folder configured for the
              // FileSync plugin, which can be private to the app
              // Cordova's camera plugin only has options to save pictures to the OS' public gallery, shared with other apps

              self.displayImage(uri);
            }, function onFileSystemURIError() {
              // Can be a data-uri when running in a browser,
              // so resolving will fail

              // in this case, just display the data-uri
              self.displayImage(uri);
            });
          }).catch(console.error);
        };
      }
      , controllerAs: 'ctrl'
    };
  });

  return moduleName;
}

module.exports = initModule;
