var config = require('./config.json');
angular.module('wfm.sync',[]).service('syncService', ['syncPool' , 'userService', function (syncPool, userService) {
  return userService.getProfile()
    .then(syncPool.syncManagerMap);
}]);

// Generating commom data repositories
var SyncApiDataService = require("./syncDataRepository");

var datasets = config.datasetIds;
angular.module('wfm.common.apiservices').service("workorderService", ['syncService', function (syncService) {
  return new SyncApiDataService(datasets.workorders, syncService);
}]);
angular.module('wfm.common.apiservices').service("workflowService", ['syncService', function (syncService) {
  return new SyncApiDataService(datasets.workflows, syncService);
}]);
angular.module('wfm.common.apiservices').service("resultService", ['syncService', function (syncService) {
  return new SyncApiDataService(datasets.results, syncService);
}]);

module.exports = 'wfm.sync';
