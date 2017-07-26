'use strict';
var $fh = require('fh-js-sdk');
var syncClient = require("@raincatcher/datasync-client");
var Promise = require('bluebird');

var DataManager = Promise.promisifyAll(syncClient.DataManager);
var syncApi = syncClient.sync;

// TODO: receive via angular constant service?
var config = require("./config.json");

/**
* Initialize sync service
*/
function initSync() {
  return new Promise(function(resolve, reject) {
    // Get server url
    $fh.on('fhinit', function(error) {
      if (error) {
        return reject(error);
      }
      var cloudUrl = $fh.getCloudURL();
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
        console.log("Cannot initialize sync for", datasetId);
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

