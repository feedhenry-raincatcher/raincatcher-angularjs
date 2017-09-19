'use strict';

function initModule() {
  var moduleName = 'wfm.vehicle-inspection';
  var ngModule = angular.module(moduleName, []);

  require('../../dist');

  ngModule.directive('vehicleInspection', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/vehicle-inspection.tpl.html')
      , controller: function($scope) {
        $scope.model = $scope.result.submission;
      },
      controllerAs: 'ctrl'
    };
  });

  ngModule.directive('vehicleInspectionForm', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/vehicle-inspection-form.tpl.html')
      , controller: function($scope) {
        var self = this;
        self.model = {};
        self.parentController = $scope.$parent;
        self.back = function(event) {
          self.parentController.ctrl.triggerBackStep(self.model);
          event.preventDefault();
          event.stopPropagation();
        };
        self.done = function(event) {
          self.parentController.ctrl.triggerCompleteStep(self.model);
          event.preventDefault();
          event.stopPropagation();
        };
      }
      , controllerAs: 'ctrl'
    };
  });

  return moduleName;
}


module.exports = initModule;
