'use strict';
var $fh = require('fh-js-sdk');
var Promise = require('bluebird');

/**
* Initialize sync service
*/
function determineCloudUrl() {
  return new Promise(function(resolve, reject) {
    // Get server url
    $fh.on('fhinit', function(error) {
      if (error) {
        return reject(error);
      }
      var cloudUrl = decodeURIComponent($fh.getCloudURL());
      return cloudUrl;
    });
  });
}

angular.module('wfm.http').value('baseUrl', determineCloudUrl());

module.exports = 'baseUrl';

