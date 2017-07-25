'use strict';
var $q = require("q");
var $fh = require('fh-js-sdk');
var syncClient = require("@raincatcher/datasync-client");
var config = require("./config.json");
var Bluebird = require('bluebird');

var DataManager = Bluebird.promisifyAll(syncClient.DataManager);
var syncApi = syncClient.sync;

/**
 * Initialize sync service
 */
function initSync() {
  var deferred = $q.defer();
  // Get server url
  $fh.on('fhinit', function(error) {
    if (error) {
      return deferred.reject(error);
    }
    var cloudUrl = $fh.getCloudURL();
    initializeGlobalSync(cloudUrl);
  });

  function initializeGlobalSync(cloudUrl) {
    var globalOptions = config.syncOptions.global;
    globalOptions.cloudUrl = cloudUrl;
    syncApi.init(globalOptions);
    deferred.resolve();
  }
  return deferred.promise;
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
  var deferred = $q.defer();
  $fh.sync.manage(datasetId, options, queryParams, metaData, function(err) {
    if (err) {
      console.log("Cannot initialize sync for", datasetId);
      deferred.reject(err);
    }
    deferred.resolve(new DataManager(datasetId));
  });
  return deferred.promise;
}

module.exports = {
  manageDataset: manageDataset,
  initSync: initSync
};

