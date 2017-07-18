'use strict';

var ngModule = angular.module('wfm.vehicle-inspection', []);
var handler = require('./vehicle-inspection-handler');

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
  , controller: function() {
    var self = this;
    self.model = {};
    self.back = function(event) {
      handler.previous(new Task(self.model), syncRepository.getProcessInstance(self.model.workorderId));
      event.preventDefault();
      event.stopPropagation();
    };
    self.done = function(event) {
      handler.next(new Task(self.model), syncRepository.getProcessInstance(self.model.workorderId));
      event.preventDefault();
      event.stopPropagation();
    };
  }
  , controllerAs: 'ctrl'
  };
});

module.exports = function(config) {

  return 'wfm.vehicle-inspection';
};
