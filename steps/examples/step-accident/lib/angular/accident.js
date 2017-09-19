'use strict';

function initModule() {
  var moduleName = 'wfm.accident';
  var ngModule = angular.module(moduleName, []);

  require('../../dist');

  ngModule.directive('accidentReport', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/accident.tpl.html')
      , controller: function($scope) {
        $scope.model = $scope.result.submission;
      },
      controllerAs: 'ctrl'
    };
  });

  ngModule.directive('accidentReportForm', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/accident-form.tpl.html')
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
