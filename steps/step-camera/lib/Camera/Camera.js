'use strict';

var Promise = require('bluebird');
var _ = require('lodash');
function Camera(optionsBuilderFunction) {
  this.init(optionsBuilderFunction);
}

var buildCameraOptions = require('./buildCameraOptions');

Camera.prototype.init = function(optionsFn) {
  console.log('init called', window.cordova);
  this.initPromise = new Promise(function(resolve, reject) {
    if (!window.cordova) {
      return reject('This module requires Apache Cordova to be available');
    }
    document.addEventListener("deviceready", function cameraReady() {
      return resolve();
    }, false);
  }).then(function() {
    console.log('camera:', navigator.camera);
    var options = buildCameraOptions(navigator.camera);
    if (_.isFunction(optionsFn)) {
      var userOptions = optionsFn(navigator.camera);
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
  return this.initPromise.then(function(cameraOptions) {
    return new Promise(function(resolve, reject) {
      return window.navigator.camera.getPicture(resolve, reject, cameraOptions);
    });
  });
};

module.exports = Camera;
