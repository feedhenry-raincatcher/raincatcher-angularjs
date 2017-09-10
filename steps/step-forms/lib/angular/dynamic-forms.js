'use strict';

var MODULE_NAME = 'raincatcher.step.dynamic-forms';

// Load schama-form angular directives
require('angular-schema-form');
require('angular-schema-form-bootstrap');

/**
 * Creates module with provided form and schema
 * See https://github.com/json-schema-form/angular-schema-form/blob/development/docs/index.md

 * @param {*} moduleName - suffix for angular module name (required)
 * @param {*} header - header for form
 * @param {*} schema - json schema used for type definitions
 * @param {*} form - form definition
 * @param {*} model - initial data for model (if needed)
 */
function initModule(moduleName, header, schema, form, model) {
  var ngModule = angular.module(MODULE_NAME, ['schemaForm']);
  require('../../dist');

  ngModule.controller('DynamicFormController', function($scope) {
    var self = this;
    $scope.title = header;
    $scope.schema = schema
    $scope.form = form
    $scope.model = model
    self.parentController = $scope.$parent;

    $scope.onSubmit = function(form) {
      // First we broadcast an event so all fields validate themselves
      $scope.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      if (form.$valid) {
        self.parentController.ctrl.triggerCompleteStep($scope.model);
      }
    }
    self.back = function(event) {
      self.parentController.ctrl.triggerBackStep($scope.model);
      event.preventDefault();
      event.stopPropagation();
    };

    self.done = function(event) {
      self.parentController.ctrl.triggerCompleteStep($scope.model);
      event.preventDefault();
      event.stopPropagation();
    };
  });

  ngModule.directive('dynamicFormsForm', function($templateCache) {
    return {
      restrict: 'E',
      template: $templateCache.get('wfm-template/dynamic-forms-form.tpl.html'),
      controller: 'DynamicFormController',
      controllerAs: 'ctrl'
    };
  });

  // ngModule.directive('dynamicForms', function($templateCache) {
  //   return {
  //     restrict: 'E',
  //     template: $templateCache.get('wfm-template/dynamic-forms.tpl.html'),
  //     controller: 'DynamicFormController',
  //     controllerAs: 'ctrl'
  //   };
  // });
  return MODULE_NAME;
}

module.exports = initModule
