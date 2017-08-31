function StepRegistry() {
  this.stepDefinitions = [];
  this.angularModules = [];
}

StepRegistry.prototype.registerStep = function(stepModule) {
  this.angularModules.push(stepModule.angularId);
  this.stepDefinitions.push(stepModule.definition);
};

module.exports = StepRegistry;
