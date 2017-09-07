var config = require("../../config.json").sync;
angular.module('wfm.sync', []).service('syncService', ['$http', '$window', 'syncPool', 'userService', function($http, $window, syncPool, userService) {
  return userService.readUser().then(function(user) {
    return syncPool.syncManagerMap(user);
  });
}]);

// Generating common data repositories
var SyncApiDataService = require("./syncDataRepository");

var datasets = config.datasetIds;
angular.module('wfm.common.apiservices').service("workorderService", ['syncService', function(syncService) {
  return new SyncApiDataService(datasets.workorders, syncService);
}]);
