var WfmService = require('@raincatcher/wfm').WfmService;

angular.module('wfm.common.apiservices').service("wfmService", ["workorderService", "workflowService", "resultService", "userService", function(workorderService, workflowService, resultService, userService) {
  return new WfmService(workorderService, workflowService, resultService, userService);
}]);
