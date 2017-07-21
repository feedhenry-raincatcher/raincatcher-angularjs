'use strict';
var $q = require("q");
var $fh = require('fh-js-sdk');
var syncClient = require("@raincatcher/datasync-client");
var config = require("./config.json");

var DataManager = syncClient.DataManager;
var syncApi = syncClient.sync;

var syncDatasetManagers = {};

$fh.on('fhinit', function(error) {
  if (error) {
    return;
  }
  var cloudUrl = $fh.getCloudURL();
  initializeSync(cloudUrl);
});

function initializeSync(cloudUrl) {
  var globalOptions = config.syncOptions.global;
  globalOptions.cloudUrl = cloudUrl;
  syncApi.init(globalOptions);
}

function createManager(datasetId, options, queryParams, metaData) {
  var manager = new DataManager(datasetId);
  syncDatasetManagers[datasetId] = manager;
  $fh.sync.manage(datasetId, options, queryParams, metaData, function(err) {
    if (err) {
      return console.log("Cannot initialize sync for", datasetId);
    }
  });
}

/**
 * Initialize sync dataset managers with user data
 * @param {User} profileData User data used for filtering
 */
function initializeManagers(profileData) {
  if (!profileData) {
    return $q.when({});
  }
  var filter = {
    'assignee': profileData.id
  };

  createManager(config.datasetIds.workorders, config.syncOptions.workorders, filter, {});
  createManager(config.datasetIds.workflows, config.syncOptions.workflows, {}, {});
  createManager(config.datasetIds.results, config.syncOptions.results, filter, {});
  return $q.when(syncDatasetManagers);
}

angular.module('wfm.sync').service('blah', ['userService', function(userService) {
  return userService.readLoggedInUser()
    .then(initializeManagers);
}]);
