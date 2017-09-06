'use strict';
var $fh = require('fh-js-sdk');
var syncClient = require("@raincatcher/datasync-client");
var Promise = require('bluebird');

var config = require("../../../config.json").sync;
var syncGlobalNetworkHandler = require('./syncGlobalNetworkHandler');
var syncApi = syncClient.sync;

/**
* Initialize sync service
*
* @param $http - angular httpd implementation
*/
function initSync($http) {
  return new Promise(function(resolve, reject) {
    // Get server url
    $fh.on('fhinit', function(error) {
      if (error) {
        return reject(error);
      }
      var cloudUrl = decodeURIComponent($fh.getCloudURL());
      var handler = syncGlobalNetworkHandler(cloudUrl, config.cloudPath, $http);
      syncApi.setCloudHandler(handler);
      initializeGlobalSync(cloudUrl);
    });

    function initializeGlobalSync(cloudUrl) {
      var globalOptions = config.syncOptions.global;
      globalOptions.cloudUrl = cloudUrl;
      syncApi.init(globalOptions);
      resolve();
    }
  });
}

module.exports = {
  initSync: initSync
};

