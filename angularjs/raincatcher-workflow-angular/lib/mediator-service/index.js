var CONSTANTS = require('../constants');
var q = require('q');
var shortid = require('shortid');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');

/**
 *
 * Removes variables added by angular from an object.
 *
 * @param {Object} itemToCleanse
 */
function removeAngularVars(itemToCleanse) {
  return JSON.parse(angular.toJson(itemToCleanse)); //remove generated angular variables
}

/**
 *
 * Getting Promises for done and error topics.
 * This will resolve or reject the returned promise depending on the topic published.
 *
 *
 * TODO: This may be of more use in fh-wfm-mediator...
 *
 * @param doneTopicPromise  - A promise for the done topic.
 * @param errorTopicPromise - A promise for the error topic.
 * @returns {Promise}
 */
function getTopicPromises(doneTopicPromise, errorTopicPromise) {
  var deferred = q.defer();

  doneTopicPromise.then(function(createdWorkorder) {
    deferred.resolve(createdWorkorder);
  });

  errorTopicPromise.then(function(error) {
    deferred.reject(error);
  });

  return deferred.promise;
}

/**
 *
 * A mediator service that will publish and subscribe to topics to be able to render workflow data.
 *
 * @param {Mediator} mediator
 * @param {object}   config
 * @constructor
 */
function WorkflowMediatorService(mediator, config) {
  this.mediator = mediator;
  this.config = config || {};

  this.workflowsTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.WORKFLOWS_ENTITY_NAME);
  this.workordersTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.WORKORDER_ENTITY_NAME);
  this.workflowStepSubscribers = new MediatorTopicUtility(mediator).prefix(CONSTANTS.WORKFLOW_PREFIX).entity(CONSTANTS.STEPS_ENTITY_NAME);

  this.workflowUITopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.WORKFLOW_UI_TOPIC_PREFIX).entity(CONSTANTS.WORKFLOW);
}


/**
 *
 * Getting Promises for the done and error topics.
 *
 * TODO: This may be of more use in fh-wfm-mediator...
 *
 * @param {MediatorTopicUtility} topicGenerator
 * @param {string} topicName   - The name of the topic to generate
 * @param {string} [topicUid]  - A topic UID if required.
 * @returns {Promise} - A promise for the topic.
 */
WorkflowMediatorService.prototype.getErrorAndDoneTopicPromises = function getErrorAndDoneTopicPromises(topicGenerator, topicName, topicUid) {
  var doneTopic = topicGenerator.getTopic(topicName, CONSTANTS.DONE_PREFIX, topicUid);
  var errorTopic = topicGenerator.getTopic(topicName, CONSTANTS.ERROR_PREFIX, topicUid);

  var doneTopicPromise = topicGenerator.mediator.promise(doneTopic);
  var errorTopicPromise = topicGenerator.mediator.promise(errorTopic);

  var timeoutDefer = q.defer();

  setTimeout(function() {
    timeoutDefer.reject(new Error("Timeout For Topic: " + doneTopic));
  }, this.config.topicTimeout || CONSTANTS.TOPIC_TIMEOUT);

  //Either one of these promises resolves/rejects or it will time out.
  return q.race([getTopicPromises(doneTopicPromise, errorTopicPromise), timeoutDefer.promise]);
};


/**
 *
 * Listing All Workflows
 *
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.listWorkflows = function listWorkflows() {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Listing all workorders
 *
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.listWorkorders = function listWorkorders() {
  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};


/**
 *
 * Reading A single workflow
 *
 * @param {string} workflowId
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.readWorkflow = function readWorkflow(workflowId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.READ, workflowId);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.READ), {id: workflowId, topicUid: workflowId});

  return promise;
};

/**
 *
 * Reading A single workorder
 *
 * @param {string} workorderId
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.readWorkorder = function readWorkorder(workorderId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.READ, workorderId);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.READ), {id: workorderId, topicUid: workorderId});

  return promise;
};

/**
 *
 * Updating A Single Workflow
 *
 * @param {object} workflowToUpdate - The Workflow To Update
 * @param {string} workflowToUpdate.id - The ID of the Workorder To Update
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.updateWorkflow = function updateWorkflow(workflowToUpdate) {
  workflowToUpdate = removeAngularVars(workflowToUpdate);
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.UPDATE, workflowToUpdate.id);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.UPDATE), {
    workflowToUpdate: workflowToUpdate,
    topicUid: workflowToUpdate.id
  });

  return promise;
};


/**
 *
 * Creating A Single Workflow
 *
 * @param {object} workflowToCreate - The Workflow To Create
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.createWorkflow = function createWorkflow(workflowToCreate) {

  workflowToCreate = removeAngularVars(workflowToCreate);
  var topicUid = shortid.generate();
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.CREATE, topicUid);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    workflowToCreate: workflowToCreate,
    topicUid: topicUid
  });

  return promise;
};

/**
 *
 * Removing A Single Workorder
 *
 * @param {object} workflowToRemove - The Workorder To Remove
 * @param {string} workflowToRemove.id - The ID of the workorder to remove.
 * @returns {Promise}
 */
WorkflowMediatorService.prototype.removeWorkflow = function removeWorkorder(workflowToRemove) {
  var workflowToRemoveId = workflowToRemove.id || workflowToRemove._localuid;
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.REMOVE, workflowToRemoveId);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.REMOVE), {
    id: workflowToRemoveId,
    topicUid: workflowToRemoveId
  });

  return promise;
};

/**
 *
 * Small utility function to subscribe to done topics for update/remove/create topics for a scope
 *
 * @param $scope
 * @param subscriberFunc
 */
WorkflowMediatorService.prototype.subscribeToWorkflowCRUDDoneTopics = function($scope, subscriberFunc) {
  this.mediator.subscribeForScope(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX), $scope, function() {
    subscriberFunc();
  });

  this.mediator.subscribeForScope(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.DONE_PREFIX), $scope, function() {
    subscriberFunc();
  });

  this.mediator.subscribeForScope(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.DONE_PREFIX), $scope, function() {
    subscriberFunc();
  });
};


/**
 *
 * Beginning a workflow for a single workorder.
 *
 * @param {string} workorderId - The ID of the workorder to begin the workflow for.
 */
WorkflowMediatorService.prototype.beginWorkflow = function(workorderId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowStepSubscribers, CONSTANTS.TOPICS.BEGIN, workorderId);

  this.mediator.publish(this.workflowStepSubscribers.getTopic(CONSTANTS.TOPICS.BEGIN), {
    workorderId: workorderId,
    topicUid: workorderId
  });

  return promise;
};

/**
 *
 * Getting a summary of the workorder. This wiil get all of the details related to the workorder, including workflow and result data.
 *
 * @param {string} workorderId - The ID of the workorder to get the summary for.
 */
WorkflowMediatorService.prototype.workflowSummary = function(workorderId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowStepSubscribers, CONSTANTS.TOPICS.SUMMARY, workorderId);

  this.mediator.publish(this.workflowStepSubscribers.getTopic(CONSTANTS.TOPICS.SUMMARY), {
    workorderId: workorderId,
    topicUid: workorderId
  });

  return promise;
};


/**
 *
 * Going to the previous step of a workorder.
 *
 * @param {string} workorderId - The ID of the workorder to switch to the previous step for
 */
WorkflowMediatorService.prototype.previousStep = function(workorderId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowStepSubscribers, CONSTANTS.TOPICS.PREVIOUS, workorderId);

  this.mediator.publish(this.workflowStepSubscribers.getTopic(CONSTANTS.TOPICS.PREVIOUS), {
    workorderId: workorderId,
    topicUid: workorderId
  });

  return promise;
};



/**
 *
 * Completing a single step for a workorder.
 *
 * @param parameters
 * @param {string} parameters.workorderId - The ID of the workorder to complete the step for
 * @param {string} parameters.submission - The submission to save
 * @param {string} parameters.stepCode - The ID of the step to save the submission for
 */
WorkflowMediatorService.prototype.completeStep = function(parameters) {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowStepSubscribers, CONSTANTS.TOPICS.COMPLETE, parameters.workorderId);

  this.mediator.publish(this.workflowStepSubscribers.getTopic(CONSTANTS.TOPICS.COMPLETE), {
    workorderId: parameters.workorderId,
    topicUid: parameters.workorderId,
    submission: parameters.submission,
    stepCode: parameters.stepCode
  });

  return promise;
};


angular.module(CONSTANTS.WORKFLOW_DIRECTIVE_MODULE).service("workflowMediatorService", ['mediator', 'WORKFLOW_CONFIG', function(mediator, WORKFLOW_CONFIG) {
  return new WorkflowMediatorService(mediator, WORKFLOW_CONFIG);
}]);