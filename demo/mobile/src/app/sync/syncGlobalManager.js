'use strict';
var $fh = require('fh-js-sdk');
var syncClient = require("@raincatcher/datasync-client");
var Promise = require('bluebird');

var DataManager = syncClient.DataManager;
var syncApi = syncClient.sync;

var config = require("../../config.json").sync;
var syncGlobalNetworkHandler = require('./syncGlobalNetworkHandler');

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
      syncGlobalNetworkHandler(cloudUrl, config.cloudPath, $http);
      //syncApi.setCloudHandler(handler);
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
/**
* Create manager for dataset
*
* @param {*} datasetId
* @param {*} options
* @param {*} queryParams
* @param {*} metaData
*/
function manageDataset(datasetId, options, queryParams, metaData) {
  return new Promise(function(resolve, reject) {
    $fh.sync.manage(datasetId, options, queryParams, metaData, function(err) {
      if (err) {
        return reject(err);
      }
      resolve(new DataManager(datasetId));
    });
  });
}

module.exports = {
  manageDataset: manageDataset,
  initSync: initSync
};

