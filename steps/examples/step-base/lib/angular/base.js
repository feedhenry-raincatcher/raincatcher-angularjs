'use strict';

function initModule() {
  var moduleName = 'wfm.base';
  var ngModule = angular.module(moduleName, []);

  require('../../dist');

  ngModule.directive('baseReport', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/base.tpl.html')
      , controller: function($scope) {
        $scope.model = $scope.result.submission;
      },
      controllerAs: 'ctrl'
    };
  });

  ngModule.directive('baseReportForm', function($templateCache) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/base-form.tpl.html')
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

  return moduleName;
}

module.exports = initModule;
