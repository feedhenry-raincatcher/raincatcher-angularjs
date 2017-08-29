'use strict';

var ngModule = angular.module('wfm.accident', []);

require('../../dist');

ngModule.directive('accidentReport', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/accident.tpl.html')
    , scope: {
      accidentModel: '=value'
    }
  };
});

ngModule.directive('accidentReportForm', function($templateCache) {
  return {
    restrict: 'E'
    , template: $templateCache.get('wfm-template/accident-form.tpl.html')
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

module.exports = 'wfm.accident';
