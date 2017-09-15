var HttpApiDataService = require("./httpDataService");

var datasets = {
  workorders: "workorders",
  workflows: "workflows",
  results: "results"
};

var workorderService;
var workflowService;

angular.module('wfm.common.apiservices').service("workorderService", ['baseUrl', '$http', function(baseUrlPromise, $http) {
  if (!workorderService) {
    workorderService = new HttpApiDataService(datasets.workorders, baseUrlPromise, $http);
  }
  return workorderService;
}]);
angular.module('wfm.common.apiservices').service("workflowService", ['baseUrl', '$http', function(baseUrlService, $http) {
  if (!workflowService) {
    return new HttpApiDataService(datasets.workflows, baseUrlService, $http);
  }
  return workflowService;
}]);
