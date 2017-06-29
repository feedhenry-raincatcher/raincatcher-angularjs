var CONSTANTS = require('../constants');

/**
 *
 * Controller for editing and creating workorders.
 * @constructor
 */
function WorkorderFormController($scope, $state, workorderApiService, workorderFlowService, $stateParams, $q) {
  var self = this;
  var today = new Date();
  today.setHours(today.getHours() - 24);
  $scope.today = today.toISOString();
  var maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 100);
  $scope.maxDate = maxDate.toISOString();
  self.submitted = false;


  var workorderId = $stateParams.workorderId;
  //Need workorder, workflows, workers
  //If there is a workorder ID in the state URL, then we are editing a worokorder, otherwise we are creating a new one.
  var workorderPromise = workorderId ? workorderApiService.readWorkorder(workorderId) : $q.when({ location: [] });
  var workflowsPromise = workorderApiService.listWorkflows();
  var workersPromise = workorderApiService.listUsers();

  self.selectWorkorder = function (event, workorder) {
    if (workorder.id) {
      workorderFlowService.workorderSelected(workorder);
    } else {
      workorderFlowService.listWorkorders();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  self.done = function (isValid) {
    self.submitted = true;
    if (isValid) {
      self.model.startTimestamp = new Date(self.model.startDate);
      self.model.startTimestamp.setHours(
        self.model.startTime.getHours(),
        self.model.startTime.getMinutes(),
        self.model.startTime.getSeconds()
      );
      self.model.finishTimestamp = new Date(self.model.finishDate);
      self.model.finishTimestamp.setHours(
        self.model.finishTime.getHours(),
        self.model.finishTime.getMinutes(),
        self.model.finishTime.getSeconds()
      );
      var workorderToCreate = JSON.parse(angular.toJson(self.model));

      var createUpdatePromise;
      if (!self.model.id && self.model.id !== 0) {
        createUpdatePromise = workorderApiService.createWorkorder(workorderToCreate);
      } else {
        createUpdatePromise = workorderApiService.updateWorkorder(workorderToCreate);
      }

      createUpdatePromise.then(function () {
        //Finished with the update/create, go back to the list.
        workorderFlowService.workorderSelected(workorderToCreate);
      });
    }
  };

  //TODO: Error handling
  $q.all([workorderPromise, workflowsPromise, workersPromise]).then(function (results) {
    self.model = results[0];
    self.workflows = results[1];
    self.workers = results[2];


    if (self.model && self.model.startTimestamp) {
      self.model.startDate = new Date(self.model.startTimestamp);
      self.model.startTime = new Date(self.model.startTimestamp);
      self.model.startTime.setMilliseconds(0);
      self.model.finishDate = new Date(self.model.finishTimestamp);
      self.model.finishTime = new Date(self.model.finishTimestamp);
      self.model.finishTime.setMilliseconds(0);
    }
  });
}

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderFormController', ['$scope', '$state', 'workorderApiService', 'workorderFlowService', '$stateParams', '$q', WorkorderFormController]);
