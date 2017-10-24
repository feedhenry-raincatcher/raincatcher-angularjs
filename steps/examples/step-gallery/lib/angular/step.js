'use strict';

var Camera = require('@raincatcher/camera').Camera;

/**
 * Initializer for the Gallery step
 * @param {galleryOptionsBuilder} cameraOptionsBuilder A function to build additional options for the cordova gallery
 */
function initModule(cameraOptionsBuilder) {
  var moduleName = 'wfm.step.gallery';
  var ngModule = angular.module(moduleName, []);

  require('../../dist');

  ngModule.directive('gallery', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/gallery.tpl.html')
      , controller: function($scope) {
        $scope.model = $scope.result.submission;
      },
      controllerAs: 'ctrl'
    };
  });

  ngModule.directive('galleryForm', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/gallery-form.tpl.html')
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

        self.addImage = function(uri) {
          $scope.$apply(function() {
            self.model.localPictures = self.model.localPictures || [];
            self.model.localPictures.push(uri);
          });
        };

        self.takePicture = function() {
          self.camera.capture().then(function(uri) {
            window.resolveLocalFileSystemURL(uri, function(entry) {
              // Cordova's camera plugin only has options to save pictures to the OS' public gallery, shared with other apps

              return self.addImage(uri);
            }, function onFileSystemURIError() {
              // Can be a data-uri when running in a browser,
              // so resolving will fail

              // in this case, just display the data-uri
              return self.addImage('data:image/jpg;base64,' + uri);
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
