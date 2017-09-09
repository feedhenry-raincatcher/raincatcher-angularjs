'use strict';

var canvasDrawr = require('../canvas-drawr');

var MODULE_NAME = 'raincatcher.step.signature';

function initModule() {
  var ngModule = angular.module(MODULE_NAME, []);
  require('../../dist');

  ngModule.directive('signatureForm', function($templateCache, $document, $timeout) {
    return {
      restrict: 'E'
      , template: $templateCache.get('wfm-template/signature-form.tpl.html')
      , scope: {
        encoding: '=',
        imageQuality: '=',
        options: '='
      }
      , link: function(scope, element, attrs, ctrl) {
        var options = scope.options || {};

        //Initialising a canvas drawer for on-device or with a mouse
        if ('ontouchstart' in $document[0]) {
          new canvasDrawr.CanvasDrawr(element, options, $document);
        } else {
          new canvasDrawr.CanvasDrawrMouse(element, options, $document);
        }

        var $canvas = angular.element(element[0].getElementsByTagName('canvas')[0]);
        $timeout(function() {
          $canvas.on('blur', function() {
            scope.$apply(function() {
              ctrl.submit(element);
            });
          });
        });
      }
      , controller: function($scope) {
        var self = this;
        self.model = {};
        self.parentController = $scope.$parent;
        var encoding = $scope.encoding || 'image/png';
        var imageQuality = parseFloat($scope.imageQuality) || 0.5; // can be decimal value

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
        self.submit = function(element) {
          var canvas = element[0].getElementsByTagName('canvas')[0];
          self.model.imageURI = canvas.toDataURL(encoding, imageQuality);
        };
      }
      , controllerAs: 'ctrl'
    };
  });

  ngModule.directive('signature', function($templateCache) {
    return {
      restrict: 'E',
      template: $templateCache.get('wfm-template/signature.tpl.html'),
      controller: function($scope) {
        $scope.model = $scope.result.submission;
      },
      controllerAs: 'ctrl'
    };
  });
  return MODULE_NAME;
}

module.exports = initModule
