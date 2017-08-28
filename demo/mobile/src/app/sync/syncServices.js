var config = require("../../config.json").sync;
var _ = require('lodash');
angular.module('wfm.sync',[]).service('syncService', ['$http', '$window', 'syncPool', 'userService', function($http, $window, syncPool, userService) {
  return userService.readUser().then(syncPool.syncManagerMap);
}]);

// Generating common data repositories
var SyncApiDataService = require("./syncDataRepository");

var datasets = config.datasetIds;
angular.module('wfm.common.apiservices').service("workorderService", ['syncService', function(syncService) {
  return new SyncApiDataService(datasets.workorders, syncService);
}]);
angular.module('wfm.common.apiservices').service("workflowService", ['syncService', function(syncService) {
  return new SyncApiDataService(datasets.workflows, syncService);
}]);
angular.module('wfm.common.apiservices').service("resultService", ['syncService', function(syncService) {
  var ResultSyncService = function() {
    SyncApiDataService.apply(this, arguments);
  };
  ResultSyncService.prototype = _.create(SyncApiDataService.prototype, {
    'constructor': ResultSyncService,
    readByWorkorder: function(workorderId) {
      // TODO: try to change this to a sync filter
      return this.list()
        .then(function(results) {
          if (_.isEmpty(results)) {
            return;
          }
          return _.find(results, function(result) {
            return result.workorderId === workorderId;
          });
        });
    }
  });
  return new ResultSyncService(datasets.results, syncService);
}]);

