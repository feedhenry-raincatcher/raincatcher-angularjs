'use strict';

var Camera = require('@raincatcher/camera').Camera;
var FileManager = require('@raincatcher/filestore-client').FileManager;

/**
 * Initializer for the Gallery step
 * @param {galleryOptionsBuilder} cameraOptionsBuilder A function to build additional options for the cordova gallery
 * @param $fh feedhenry client library
 */
function initModule(cameraOptionsBuilder) {
  var moduleName = 'wfm.step.gallery';
  // require http module to get server baseUrl
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

  ngModule.directive('galleryForm', ['$templateCache', 'workorderService', function($templateCache, workorderService) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/gallery-form.tpl.html')
      , controller: function($scope) {
        var self = this;

        self.camera = new Camera(cameraOptionsBuilder);
        self.fileManager = new FileManager('/api/file', workorderService, 'camera');

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
          self.camera.capture().then(function(fileEntry) {
            self.uploadPicture(fileEntry);
            return self.addImage(fileEntry.uri);
          }).catch(console.error);
        };

        self.uploadPicture = function(fileEntry) {
          self.fileManager.scheduleFileToBeUploaded(fileEntry);
        };
      }
      , controllerAs: 'ctrl'
    };
  }]);

  return moduleName;
}

module.exports = initModule;
