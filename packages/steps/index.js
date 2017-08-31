var StepRegistry = require('./StepRegistry');
angular.module('wfm.steps', []);

angular.module('wfm.steps').service(["StepRegistry"], function() {
  return new StepRegistry();
});

module.exports = 'wfm.steps';
