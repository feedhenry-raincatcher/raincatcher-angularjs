module.exports = {
  id: 'vehicle-inspection',
  displayName: 'Vehicle Inspection',
  portalDirective: 'vehicleInspection',
  mobileDirective: 'vehicleInspectionForm',
  execute: function(task, processInstance) {
    
  },
  next: function(task, processInstance) {
    processInstance.nextTask();
  },
  previous: function(task, processInstance) {
    processInstance.previousTask();
  }
};