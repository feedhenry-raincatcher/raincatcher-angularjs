var _ = require('lodash');

// Generating common data repositories
var HttpApiDataService = require("./httpDataService");

var datasets = {
  workorders: "workorders",
  workflows: "workflows",
  results: "results"
};
angular.module('wfm.common.apiservices').service("workorderService", ['baseUrl', '$http', function(baseUrlPromise, $http) {
  return new HttpApiDataService(datasets.workorders, baseUrlPromise, $http);
}]);
angular.module('wfm.common.apiservices').service("workflowService", ['baseUrl', '$http', function(baseUrlService, $http) {
  return new HttpApiDataService(datasets.workflows, baseUrlService, $http);
}]);
