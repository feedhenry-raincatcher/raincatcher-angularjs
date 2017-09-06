var config = require("../../config.json").sync;


var SyncApiDataService = require("../sync/syncDataRepository");

/**
 * Represents all angular based services that can be used for data operations.
 */
var datasets = config.datasetIds;

angular.module('wfm.common.apiservices').service("workorderService", [function() {
  return new SyncApiDataService();
}]);

