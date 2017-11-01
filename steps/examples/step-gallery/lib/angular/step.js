'use strict';

var Camera = require('@raincatcher/camera').Camera;
var FileManager = require('@raincatcher/filestore-client').FileManager;
var getServerUrl = require('./urlProvider');

/**
 * Initializer for the Gallery step
 * @param {galleryOptionsBuilder} cameraOptionsBuilder A function to build additional options for the cordova gallery
 * @param $fh feedhenry client library
 */
function initModule($fh, cameraOptionsBuilder) {
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

  ngModule.directive('galleryForm', ['$templateCache', '$http', function($templateCache, $http) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/gallery-form.tpl.html')
      , controller: function($scope) {
        var self = this;
        var fileManagerClient = {
          upload: function(uri, formData) {
            return $http({
              url: uri,
              method: 'POST',
              headers: {
                'Content-Type': undefined
              },
              data: formData
            });
          },
          download: function(uri) {
            return $http({
              method: 'GET',
              url: uri
            });
          }
        };

        getServerUrl($fh).then(function(serverBaseUrl) {
          var url = new URL('/file/', serverBaseUrl);
          self.fileManager = new FileManager(url.toString(), 'gallery', fileManagerClient);
          self.camera = new Camera(cameraOptionsBuilder);
        });

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
          self.camera.capture().then(function(captureResponse) {
            self.addImage(captureResponse.value);
            return captureResponse;
          }).then(function(captureResponse) {
            var file = {
              uri: captureResponse.value,
              type: captureResponse.type
            };
            return self.fileManager.scheduleFileToBeUploaded(file);
          }).catch(console.error);
        };
      }
      , controllerAs: 'ctrl'
    };
  }]);

  return moduleName;
}

module.exports = initModule;
