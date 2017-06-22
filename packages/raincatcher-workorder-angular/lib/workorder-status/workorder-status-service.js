var CONSTANTS = require('../constants');

var getStatusIconColor = function(status) {
  var statusIcon;
  var statusColor;
  switch (status) {
  case 'In Progress':
    statusIcon = 'autorenew';
    statusColor = 'warning';
    break;
  case 'Complete':
    statusIcon = 'assignment_turned_in';
    statusColor = 'success';
    break;
  case 'Aborted':
    statusIcon = 'assignment_late';
    statusColor = 'danger';
    break;
  case 'On Hold':
    statusIcon = 'pause';
    statusColor = 'warning';
    break;
  case 'Unassigned':
    statusIcon = 'assignment_ind';
    statusColor = 'warning';
    break;
  case 'New':
    statusIcon = 'new_releases';
    statusColor = '';
    break;
  default:
    statusIcon = 'radio_button_unchecked';
    statusColor = '';
  }
  return {
    statusIcon: statusIcon,
    statusColor: statusColor
  };
};

angular.module(CONSTANTS.WORKORDER_DIRECTIVE).service('workorderStatusService', function() {
  return {
    getStatusIconColor: getStatusIconColor
  };
});