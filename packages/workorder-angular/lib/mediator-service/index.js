var CONSTANTS = require('../constants');
var shortid = require('shortid');
var q = require('q');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');

/**
 *
 * Getting Promises for done and error topics.
 * This will resolve or reject the returned promise depending on the topic published.
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
 * A mediator service that will publish and subscribe to topics to be able to render data.
 *
 * @param {Mediator} mediator
 * @param {object}   config
 * @constructor
 */
function WorkorderMediatorService(mediator, config) {
  this.mediator = mediator;
  this.config = config || {};

  this.workordersTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.WORKORDER_ENTITY_NAME);
  this.usersTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.USERS_ENTITY_NAME);
  this.workflowsTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.WORKFLOWS_ENTITY_NAME);
  this.resultsTopics = new MediatorTopicUtility(mediator).prefix(CONSTANTS.TOPIC_PREFIX).entity(CONSTANTS.RESULTS_ENTITY_NAME);
  this.workorderSyncSubscribers = new MediatorTopicUtility(mediator)
    .prefix(CONSTANTS.SYNC_TOPIC_PREFIX)
    .entity(CONSTANTS.WORKORDER_ENTITY_NAME);
}

/**
 *
 * Getting Promises for the done and error topics.
 *
 * @param {MediatorTopicUtility} topicGenerator
 * @param {string} topicName   - The name of the topic to generate
 * @param {string} [topicUid]  - A topic UID if required.
 * @returns {Promise} - A promise for the topic.
 */
WorkorderMediatorService.prototype.getErrorAndDoneTopicPromises = function getErrorAndDoneTopicPromises(topicGenerator, topicName, topicUid) {
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
 * Listing all workorders
 *
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.listWorkorders = function listWorkorders() {
  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};


/**
 *
 * Reading a single Workorder
 *
 * @param workorderId - The ID of the Workorder To Read
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.readWorkorder = function readWorkorder(workorderId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.READ, workorderId);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.READ), {
    id: workorderId,
    topicUid: workorderId
  });

  return promise;
};

/**
 *
 * Creating a new Workorder
 *
 * @param {object} workorderToCreate - The Workorder To Create
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.createWorkorder = function createWorkorder(workorderToCreate) {
  var topicUid = shortid.generate();

  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.CREATE, topicUid);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.CREATE), {
    workorderToCreate: workorderToCreate,
    topicUid: topicUid
  });

  return promise;
};

/**
 *
 * Updating A Single Workorder
 *
 * @param {object} workorderToUpdate - The Workorder To Create
 * @param {string} workorderToUpdate.id - The ID of the Workorder To Update
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.updateWorkorder = function updateWorkorder(workorderToUpdate) {

  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.UPDATE, workorderToUpdate.id);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.UPDATE), {
    workorderToUpdate: workorderToUpdate,
    topicUid: workorderToUpdate.id
  });

  return promise;
};

/**
 *
 * Removing A Single Workorder
 *
 * @param {object} workorderToRemove - The Workorder To Remove
 * @param {string} workorderToRemove.id - The ID of the workorder to remove.
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.removeWorkorder = function removeWorkorder(workorderToRemove) {

  var promise = this.getErrorAndDoneTopicPromises(this.workordersTopics, CONSTANTS.TOPICS.REMOVE, workorderToRemove.id);

  this.mediator.publish(this.workordersTopics.getTopic(CONSTANTS.TOPICS.REMOVE), {
    id: workorderToRemove.id,
    topicUid: workorderToRemove.id
  });

  return promise;
};

/**
 *
 * Listing All Workflows
 *
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.listWorkflows = function listWorkflows() {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};


/**
 * Reading A single workflow
 * @param {string} workflowId
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.readWorkflow = function readWorkflow(workflowId) {
  var promise = this.getErrorAndDoneTopicPromises(this.workflowsTopics, CONSTANTS.TOPICS.READ, workflowId);

  this.mediator.publish(this.workflowsTopics.getTopic(CONSTANTS.TOPICS.READ), {id: workflowId, topicUid: workflowId});

  return promise;
};

/**
 *
 * Listing All Results
 *
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.listResults = function listResults() {
  var promise = this.getErrorAndDoneTopicPromises(this.resultsTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.resultsTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Reading A Single User
 *
 * @param {string} userId - the ID of the user to read
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.readUser = function readUser(userId) {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.READ, userId);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.READ), {id: userId, topicUid: userId});

  return promise;
};

/**
 *
 * Listing All Users
 *
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.listUsers = function listUsers() {
  var promise = this.getErrorAndDoneTopicPromises(this.usersTopics, CONSTANTS.TOPICS.LIST);

  this.mediator.publish(this.usersTopics.getTopic(CONSTANTS.TOPICS.LIST));

  return promise;
};

/**
 *
 * Subscribing to any workorders list updates. This is useful if lists need to be refreshed.
 *
 * @param $scope - Passing the scope because the subscriber should be removed when the scope has been destroyed to avoid zombie subscribers.
 * @param {function} functionToExecute - The subscribing function to use when
 * @returns {Promise}
 */
WorkorderMediatorService.prototype.subscribeToListUpdated = function subscribeToListUpdated($scope, functionToExecute) {

  this.mediator.subscribeForScope(this.workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.DELTA_RECEIVED), $scope, functionToExecute);
};

/**
 *
 * Utility Function To Read all results and create a map for UI rendering.
 *
 * @returns {*}
 */
WorkorderMediatorService.prototype.resultMap = function() {
  return this.listResults()
    .then(function(results) {
      var map = {};
      results.forEach(function(result) {
        map[result.workorderId] = result;
      });
      return map;
    });
};

angular.module(CONSTANTS.WORKORDER_SERVICE, ['wfm.core.mediator']).service("workorderMediatorService", ['mediator', "WORKORDER_CONFIG", function(mediator, WORKORDER_CONFIG) {
  return new WorkorderMediatorService(mediator, WORKORDER_CONFIG);
}]);

module.exports = CONSTANTS.WORKORDER_SERVICE;