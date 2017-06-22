var CONSTANTS = require('../constants');


angular.module(CONSTANTS.WORKORDER_DIRECTIVE).directive('workorderStatus', function() {
  return {
    restrict: 'E'
    , template: '<md-icon md-font-set="material-icons">{{statusIcon}}<md-tooltip>{{status}}</md-tooltip></md-icon>'
    , scope: {
      status : '=status'
    }
    , controller: function($scope, workorderStatusService) {
      $scope.statusIcon = workorderStatusService.getStatusIconColor($scope.status).statusIcon;
    }
    , controllerAs: 'ctrl'
  };
});