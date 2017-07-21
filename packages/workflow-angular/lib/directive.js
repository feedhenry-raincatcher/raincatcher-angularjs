'use strict';

var CONSTANTS = require('./constants');

/**
 * Entry point for the fh-wfm-workflow module.
 *
 * @param {object} config - Config for the fh-wfm-workflow module
 * @returns {string}
 */
module.exports = function(config) {
  angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE, ["wfm.common.apiservices"]).constant("WORKFLOW_CONFIG", config);

  //Adding any html templates to the $template cache for this module.
  require('../dist');

  //Workflow api facade
  require('./services/api-service');

  //Creating the service that interacts with angular router
  require('./services/flow-service');

  //This is the functionality required to progress through a workflow.
  require('./workflow-process');

  //This is all of the functionality to list workflows to the user.
  require('./workflow-list');

  //This is the view to display the current progress of a workflow. (Which step, summary etc)
  require("./workflow-progress");

  //This is the view to display the result of a workflow to the user (TODO: Does this belong in the result module?)
  require("./workflow-result");

  //This is the view to edit the detail of a single workflow (Currently just the name..)
  require('./workflow-form');

  //This is the view to edit the detail of a single step in a workflow.
  require('./workflow-step-form');

  //This is the view to display the current detail of a single step in a workflow.
  require('./workflow-step-detail');

  //This is the view to display the workflow name and all of the steps to the user.
  require('./workflow-detail');

  return CONSTANTS.WORKFLOW_DIRECTIVE_MODULE;
};


