'use strict';

var q = require('q');

function Camera() {
  this.init();
}

Camera.prototype.init = function() {
  var self = this;
  var deferred = q.defer();
  if (window.cordova) {
    document.addEventListener("deviceready", function cameraReady() {
      deferred.resolve();
    }, false);
  } else {
    deferred.resolve();
  }

  self.initPromise = deferred.promise;
  return self.initPromise;
};

Camera.prototype.clearCache = function() {
  window.navigator.camera.cleanup();
};

Camera.prototype.capture = function() {
  var self = this;
  var deferred = q.defer();
  self.initPromise.then(function() {
    window.navigator.camera.getPicture(function captureSuccess(fileURI) {
      var fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
      deferred.resolve({
        fileName: fileName,
        fileURI: fileURI
      });
    }, function captureFailure(error) {
      deferred.reject(error);
    }, {
      quality: 100,
      destinationType: window.navigator.camera.DestinationType.FILE_URI,
      encodingType: window.Camera.EncodingType.JPEG,
      correctOrientation: true
    });
  });
  return deferred.promise;
};

var camera = new Camera();
module.exports = camera;
