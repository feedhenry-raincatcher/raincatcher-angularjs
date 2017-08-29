'use strict';

var ngModule = angular.module('wfm.vehicle-inspection', []);

require('../../dist');

ngModule.directive('vehicleInspection', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/vehicle-inspection.tpl.html')
    , scope: {
      vehicleInspection: '=value'
    }
  };
});

ngModule.directive('vehicleInspectionForm', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/vehicle-inspection-form.tpl.html')
    , scope: {
    }
    , controller: function($scope) {
      var self = this;
      self.model = {};
      self.parentController = $scope.$parent;
      self.back = function(event) {
        this.parentController.ctrl.triggerBackStep(this.model);
        event.preventDefault();
        event.stopPropagation();
      };
      self.done = function(event) {
        this.parentController.ctrl.triggerCompleteStep(this.model);
        event.preventDefault();
        event.stopPropagation();
      };
    }
    , controllerAs: 'ctrl'
  };
});

module.exports = 'wfm.vehicle-inspection';
