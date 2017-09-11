var CONSTANTS = require('../constants');

var getStatusIconColor = function(status) {
  var statusIcon;
  var statusColor;
  switch (status) {
  case 'Pending':
    statusIcon = 'autorenew';
    statusColor = 'warning';
    break;
  case 'Complete':
    statusIcon = 'assignment_turned_in';
    statusColor = 'success';
    break;
  case 'New':
    statusIcon = 'assignment_ind';
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
