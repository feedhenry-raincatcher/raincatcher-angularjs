'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
function Camera(optionsBuilderFunction) {
  this.init(optionsBuilderFunction);
}

var buildCameraOptions = require('./buildCameraOptions');

Camera.prototype.init = function(optionsFn) {
  this.initPromise = new Promise(function(resolve, reject) {
    if (!window.cordova) {
      return reject('This module requires Apache Cordova to be available');
    }
    document.addEventListener("deviceready", function cameraReady() {
      return resolve();
    }, false);
  }).then(function() {
    var options = buildCameraOptions(window.camera);
    if (_.isFunction(optionsFn)) {
      var userOptions = optionsFn(window.camera);
      options = _.merge(options, userOptions);
    }
    return options;
  });
};

Camera.prototype.cleanup = function() {
  this.initPromise.then(function() {
    return window.navigator.camera.cleanup();
  });
};

Camera.prototype.capture = function() {
  return self.initPromise.then(function(cameraOptions) {
    return new Promise(function(resolve, reject) {
      return window.navigator.camera.getPicture(resolve, reject, cameraOptions);
    });
  });
};

module.exports = Camera;
