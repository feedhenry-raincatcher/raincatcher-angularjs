'use strict';

var Camera = require('@raincatcher/camera').Camera;
var FileManager = require('@raincatcher/filestore-client').FileManager;
var getServerUrl = require('./urlProvider');
var uuid = require('uuid-js');

/**
 * Initializer for the Gallery step
 * @param {galleryOptionsBuilder} cameraOptionsBuilder A function to build additional options for the cordova gallery
 * @param $fh feedhenry client library
 */
function initModule($fh, cameraOptionsBuilder, mode) {
  var moduleName = 'wfm.step.gallery';
  // require http module to get server baseUrl
  var ngModule = angular.module(moduleName, []);

  require('../../dist');

  ngModule.directive('gallery', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/gallery.tpl.html')
      , controller: function($scope) {
        var self = this;

        getServerUrl($fh).then(function(serverBaseUrl) {
          var baseFileUrl = new URL('/file/', serverBaseUrl);
          $scope.pictures = self.getPictures(baseFileUrl);
        });

        self.getPictures = function(baseFileUrl) {
          var gallery = $scope.result.submission.gallery;
          var pictures = [];
          for (var i in gallery) {
            if (gallery[i]) {
              if (mode === "admin") {
                pictures.push(baseFileUrl + gallery[i].id);
              } else {
                pictures.push(gallery[i].uri);
              }
            }
          }
          return pictures;
        };
      },
      controllerAs: 'ctrl'
    };
  });

  ngModule.directive('galleryForm', ['$templateCache', '$http', '$mdDialog', function($templateCache, $http, $mdDialog) {
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

        self.addImage = function(uri, id) {
          $scope.$apply(function() {
            self.model.gallery = self.model.gallery || [];
            self.model.gallery.push({ uri: uri, id: id });
          });
        };

        self.takePicture = function() {
          if (!window.navigator.camera) {
            var alert = $mdDialog.alert({
              title: 'Camera not available in browser',
              textContent: 'Camera plugin not available. Try running project in emulator or using `cordova run browser`.',
              ok: 'Close'
            });
            return $mdDialog.show(alert);
          }
          self.camera.capture().then(function(captureResponse) {
            captureResponse.id = uuid.create().toString();
            self.addImage(captureResponse.value, captureResponse.id);
            return captureResponse;
          }).then(function(captureResponse) {
            var file = {
              uri: captureResponse.value,
              type: captureResponse.type,
              id: captureResponse.id
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
