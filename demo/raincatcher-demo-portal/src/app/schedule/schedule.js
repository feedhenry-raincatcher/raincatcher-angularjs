'use strict';

module.exports = 'app.schedule';

angular.module('app.schedule', [
  'ui.router'
, 'wfm.core.mediator'
])

.config(function($stateProvider) {
  $stateProvider
    .state('app.schedule', {
      url: '/schedule',
      resolve: {
        workorders: function(workorderManager) {
          return workorderManager.list();
        },
        workers: function(userClient) {
          return userClient.list();
        }
      },
      data: {
        columns: 2
      },
      views: {
        content: {
          templateUrl: 'app/schedule/schedule.tpl.html',
          controller: 'scheduleController as ctrl'
        }
      }
    });
})

.controller('scheduleController', function(mediator, workorderManager, workorders, workers) {
  var self = this;
  self.workorders = workorders;
  self.workers = workers;
  mediator.subscribe('wfm:schedule:workorder', function(workorder) {
    workorderManager.update(workorder).then(function(updatedWorkorder) {
      mediator.publish('done:wfm:schedule:workorder:' + workorder.id, updatedWorkorder);
    }, function(error) {
      console.error(error);
    });
  });
})

;
