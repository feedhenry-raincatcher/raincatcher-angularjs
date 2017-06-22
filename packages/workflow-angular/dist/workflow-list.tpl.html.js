var ngModule;
try {
  ngModule = angular.module('wfm.workflow.directives');
} catch (e) {
  ngModule = angular.module('wfm.workflow.directives', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
  $templateCache.put('wfm-template/workflow-list.tpl.html',
    '<md-toolbar>\n' +
    '  <div class="md-toolbar-tools">\n' +
    '    <h3>\n' +
    '      <span>Workflows</span>\n' +
    '    </h3>\n' +
    '  </div>\n' +
    '</md-toolbar>\n' +
    '\n' +
    '<form action="#" class="persistent-search">\n' +
    '  <label for="search"><i class="material-icons">search</i></label>\n' +
    '  <input type="text" id="search" placeholder="Search" ng-model="searchValue" ng-change="ctrl.applyFilter(searchValue)">\n' +
    '</form>\n' +
    '\n' +
    '<md-list ng-if="ctrl.workflows">\n' +
    '  <md-list-item ng-repeat="workflow in ctrl.workflows" ng-click="ctrl.selectWorkflow($event, workflow)"\n' +
    '                ng-class="{active: selected.id === (workflow.id || workflow._localuid)}" >\n' +
    '    <div class="md-list-item-text">\n' +
    '      <p>\n' +
    '        {{workflow.title}} <br/>\n' +
    '        <md-icon ng-if="workflow._syncStatus" md-font-set="material-icons" class="material-icons sync-error-icon">\n' +
    '          sync_problem\n' +
    '        </md-icon>\n' +
    '        <i ng-if="workflow._syncStatus" class="sync-error-message"> Sync failed: {{workflow._syncStatus.message}} </i>\n' +
    '      </p>\n' +
    '    </div>\n' +
    '    <md-divider></md-divider>\n' +
    '  </md-list-item>\n' +
    '</md-list>\n' +
    '');
}]);
