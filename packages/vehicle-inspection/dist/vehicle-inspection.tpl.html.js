var ngModule;
try {
  ngModule = angular.module('wfm.vehicle-inspection');
} catch (e) {
  ngModule = angular.module('wfm.vehicle-inspection', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/vehicle-inspection.tpl.html',
    '\n' +
    '  <md-subheader>Vehicle Inspection</md-subheader>\n' +
    '\n' +
    '  <md-list class="risk-assessment">\n' +
    '\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons">local_gas_station</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3>{{vehicleInspection.fuel}} %</h3>\n' +
    '        <p>Fuel</p>\n' +
    '      </div>\n' +
    '    <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons" ng-if="vehicleInspection.tires" class="success">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-if="! vehicleInspection.tires" class="danger">cancel</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3 ng-if="vehicleInspection.tires">Pass</h3>\n' +
    '        <h3 ng-if="! vehicleInspection.tires">Fail</h3>\n' +
    '        <p>Tires</p>\n' +
    '      </div>\n' +
    '    <md-divider></md-divider>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '    <md-list-item class="md-2-line" >\n' +
    '      <md-icon md-font-set="material-icons" ng-if="vehicleInspection.lights" class="success">check_circle</md-icon>\n' +
    '      <md-icon md-font-set="material-icons" ng-if="! vehicleInspection.lights" class="danger">cancel</md-icon>\n' +
    '      <div class="md-list-item-text">\n' +
    '        <h3 ng-if="vehicleInspection.lights">Pass</h3>\n' +
    '        <h3 ng-if="! vehicleInspection.lights">Fail</h3>\n' +
    '        <p>Lights</p>\n' +
    '      </div>\n' +
    '    </md-list-item>\n' +
    '\n' +
    '</md-list>\n' +
    '');
}]);
