var CONSTANTS = require('../constants');

function scrollToActive(element) {
  element = element[0];
  var active = element.querySelector('li.active');
  if (!active) {
    active = element.querySelector('li');
  }
  var scroller = element.querySelector('.scroll-box');
  var offset = active.offsetTop;
  scroller.scrollTop = offset;
}

function parseStepIndex(ctrl, stepIndex) {
  ctrl.stepIndex = stepIndex;
  ctrl.step = ctrl.steps[ctrl.stepIndex];
}

angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).service("WorkflowProgressService", [function() {
  return {
    scrollToActive: scrollToActive,
    parseStepIndex: parseStepIndex
  };
}]);