var WfmService = require('@raincatcher/wfm').WfmService;

angular.module('wfm.common.apiservices').service("wfmService", ["workorderService", "workflowService", "userService", function(workorderService, workflowService, userService) {
  return new WfmService(workorderService, workflowService,  userService);
}]);
