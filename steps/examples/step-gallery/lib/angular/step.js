'use strict';

var Camera = require('@raincatcher/camera').Camera;
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

  ngModule.directive('galleryForm', ['$templateCache', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/gallery-form.tpl.html')
      , controller: function($scope) {
        var self = this;

        getServerUrl($fh).then(function(serverBaseUrl) {
          self.camera = new Camera(serverBaseUrl + '/api/file', cameraOptionsBuilder);
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
          self.camera.capture().then(function(fileEntry) {
            return self.addImage(fileEntry.uri);
          }).catch(console.error);
        };
      }
      , controllerAs: 'ctrl'
    };
  }]);

  return moduleName;
}

module.exports = initModule;