var ngModule;
try {
  ngModule = angular.module('wfm.workorder.directives');
} catch (e) {
  ngModule = angular.module('wfm.workorder.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workorder-form.tpl.html',
    '<md-toolbar class="content-toolbar md-primary">\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>{{ctrl.model.id ? \'Update\' : \'Create\'}} workorder</h3>\n' +
    '    <md-button class="md-icon-button" aria-label="{{ctrl.status}}">\n' +
    '      <workorder-status status="ctrl.status"></workorder-status>\n' +
    '    </md-button>\n' +
    '\n' +
    '    <span flex></span>\n' +
    '    <md-button class="md-icon-button" aria-label="Close" ng-click="ctrl.selectWorkorder($event, ctrl.model)">\n' +
    '      <md-icon md-font-set="material-icons">close</md-icon>\n' +
    '    </md-button>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form name="workorderForm" ng-submit="ctrl.done(workorderForm.$valid)" novalidate layout-padding layout-margin>\n' +
    '\n' +
    '  <div layout-gt-sm="row">\n' +
    '    <md-input-container class="md-block" flex-gt-sm ng-if="ctrl.model.id">\n' +
    '      <label>Workflow</label>\n' +
    '      <input type="text" ng-model="ctrl.model.workflow.title" ng-disabled="true">\n' +
    '    </md-input-container>\n' +
    '    <md-input-container class="md-block" flex-gt-sm ng-if="!ctrl.model.id">\n' +
    '      <label for="workflow">Workflow</label>\n' +
    '      <md-select ng-model="ctrl.model.workflow" name="workflow" id="workflow" required>\n' +
    '        <md-option ng-repeat="workflow in ctrl.workflows" ng-value="workflow">{{workflow.title}} v{{workflow.version}}</md-option>\n' +
    '      </md-select>\n' +
    '      <div ng-messages="workorderForm.workflow.$error" ng-if="ctrl.submitted || workorderForm.workflow.$dirty">\n' +
    '        <div ng-message="required">A workflow is required.</div>\n' +
    '      </div>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <div>\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label for="assignee">Assignee</label>\n' +
    '      <md-autocomplete md-selected-item-change="ctrl.userSelected(selectedUser)" md-selected-item="selectedUser" md-item-text="selectedUser.name"\n' +
    '        md-min-length="3" md-delay="700" md-search-text="searchText" md-items="item in ctrl.userQuery(searchText)">\n' +
    '        <md-item-template>\n' +
    '          <span md-highlight-text="searchText">{{item.name}}</span>\n' +
    '        </md-item-template>\n' +
    '        <md-not-found>\n' +
    '          No matches found.\n' +
    '        </md-not-found>\n' +
    '      </md-autocomplete>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <div>\n' +
    '    <md-input-container class="md-block">\n' +
    '      <label>Title</label>\n' +
    '      <input type="text" id="inputTitle" name="title" ng-model="ctrl.model.title" required>\n' +
    '      <div ng-messages="workorderForm.title.$error" ng-if="ctrl.submitted || workorderForm.title.$dirty">\n' +
    '        <div ng-message="required">A title is required.</div>\n' +
    '      </div>\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <div layout-gt-sm="row" ng-if="ctrl.model.startDate">\n' +
    '    <md-input-container class="md-block" flex-gt-sm>\n' +
    '      <label for="inputStartDate">Start Date</label>\n' +
    '      <input type="date" id="inputStartDate" name="startDate" min="{{today}}" max="{{maxDate}}" ng-model="ctrl.model.startDate"\n' +
    '        ng-disabled="true">\n' +
    '    </md-input-container>\n' +
    '    <md-input-container class="md-block" flex-gt-sm>\n' +
    '      <label for="inputStartTime">Start Time</label>\n' +
    '      <input type="time" id="inputStartTime" name="startTime" ng-model="ctrl.model.startTime" ng-disabled="true">\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <div layout-gt-sm="row" ng-if="ctrl.model.finishTime">\n' +
    '    <md-input-container class="md-block" flex-gt-sm>\n' +
    '      <label for="inputFinishDate">Finish Date</label>\n' +
    '      <input type="date" id="inputFinishDate" name="finishDate" min="{{today}}" max="{{maxDate}}" ng-model="ctrl.model.finishDate"\n' +
    '        ng-disabled="true">\n' +
    '    </md-input-container>\n' +
    '    <md-input-container class="md-block" flex-gt-sm>\n' +
    '      <label for="inputFinishTime">Finish Time</label>\n' +
    '      <input type="time" id="inputFinishTime" name="finishTime" ng-model="ctrl.model.finishTime" ng-disabled="true">\n' +
    '    </md-input-container>\n' +
    '  </div>\n' +
    '\n' +
    '  <md-button type="submit" class="md-raised md-primary">{{ctrl.model.id ? \'Update\' : \'Create\'}} Workorder</md-button>\n' +
    '</form>\n' +
    '');
}]);
