
angular.module('wfm.common.apiservices', ['wfm.sync']);

require("./resultService");
require('./wfmService');
require('./workflowService');
require('./workorderService');

module.exports = 'wfm.common.apiservices';
