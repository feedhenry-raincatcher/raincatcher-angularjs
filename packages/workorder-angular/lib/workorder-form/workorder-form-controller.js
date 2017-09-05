var CONSTANTS = require('../constants');
var shortid = require("shortid");

/**
 *
 * Controller for editing and creating workorders.
 * @constructor
 */
function WorkorderFormController($scope, $state, workorderService, workflowService, workorderFlowService,
  userService, $stateParams, $q) {
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
  var workorderPromise = workorderId ? workorderService.read(workorderId) : $q.when({});
  var workflowsPromise = workflowService.list();

  self.userQuery = function(searchText) {
    return userService.listUsers(searchText);
  };

  self.userSelected = function(user) {
    if (user) {
      self.model.assignee = user.id;
    }
  };

  self.selectWorkorder = function(event, workorder) {
    if (workorder.id) {
      workorderFlowService.workorderSelected(workorder);
    } else {
      workorderFlowService.listWorkorders();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  self.done = function(isValid) {
    self.submitted = true;
    if (isValid) {
      var workorderToCreate = self.model;
      var createUpdatePromise;
      if (!self.model.id && self.model.id !== 0) {
        self.model.id = shortid.generate();
        createUpdatePromise = workorderService.create(workorderToCreate);
      } else {
        createUpdatePromise = workorderService.update(workorderToCreate);
      }
      createUpdatePromise.then(function() {
        //Finished with the update/create, go back to the list.
        workorderFlowService.workorderSelected(workorderToCreate);
      });
    }
  };

  $q.all([workorderPromise, workflowsPromise]).then(function(results) {
    self.model = results[0];
    self.workflows = results[1];

    if (self.model) {
      if (self.model.assignee) {
        userService.readUserById(self.model.assignee)
          .then(function(data) {
            $scope.selectedUser = data;
          });
      }
      if (self.model.startTimestamp) {
        self.model.startDate = new Date(self.model.startTimestamp);
        self.model.startTime = new Date(self.model.startTimestamp);
        self.model.startTime.setMilliseconds(0);
      }
      if (self.model.finishTimestamp) {
        self.model.finishDate = new Date(self.model.finishTimestamp);
        self.model.finishTime = new Date(self.model.finishTimestamp);
        self.model.finishTime.setMilliseconds(0);
      }
    }
  });
}

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).controller('WorkorderFormController',
  ['$scope', '$state', 'workorderService', 'workflowService', 'workorderFlowService', 'userService', '$stateParams', '$q', WorkorderFormController]);
