/**
 * NOTE: This is only for backward compatibility with the existing demo apps.
 *
 * When this functionality has been moved to modules, then this can be removed.
 *
 * @type {_|exports|module.exports}
 * @private
 */

var q = require('q');
var _ = require('lodash');
var shortid = require('shortid');
var CONSTANTS = require('../constants');
var MediatorTopicUtility = require('fh-wfm-mediator/lib/topics');
var mediator, manager, workflowSyncSubscribers;

/**
 *
 * Getting Promises for done and error topics.
 *
 * @param doneTopicPromise  - A promise for the done topic.
 * @param errorTopicPromise - A promise for the error topic.
 * @returns {*}
 */
function getTopicPromises(doneTopicPromise, errorTopicPromise) {
  var deferred = q.defer();

  doneTopicPromise.then(function(createdWorkflow) {
    deferred.resolve(createdWorkflow);
  });

  errorTopicPromise.then(function(error) {
    deferred.reject(error);
  });

  return deferred.promise;
}


/**
 *
 * Creating a new workflow.
 *
 * @param {object} workflowToCreate - The Workflow to create.
 */
function create(workflowToCreate) {

  //Creating a unique channel to get the response
  var topicUid = shortid.generate();

  var topicParams = {topicUid: topicUid, itemToCreate: workflowToCreate};

  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX, topicUid));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.ERROR_PREFIX, topicUid));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.CREATE), topicParams);

  return getTopicPromises(donePromise, errorPromise);
}

/**
 *
 * Updating an existing workflow.
 *
 * @param {object} workflowToUpdate - The workflow to update
 * @param {string} workflowToUpdate.id - The ID of the workflow to update
 */
function update(workflowToUpdate) {
  var topicParams = {topicUid: workflowToUpdate.id, itemToUpdate: workflowToUpdate};

  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.DONE_PREFIX, topicParams.topicUid));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.ERROR_PREFIX, topicParams.topicUid));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.UPDATE), topicParams);

  return getTopicPromises(donePromise, errorPromise);
}

/***
 *
 * Reading a single workflow.
 *
 * @param {string} workflowId - The ID of the workflow to read
 */
function read(workflowId) {
  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.READ, CONSTANTS.DONE_PREFIX, workflowId));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.READ, CONSTANTS.ERROR_PREFIX, workflowId));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.READ), {id: workflowId, topicUid: workflowId});

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Listing All Workflows
 */
function list() {
  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.LIST));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 *
 * Removing a workororder using the sync topics
 *
 * @param {object} workflowToRemove
 * @param {string} workflowToRemove.id - The ID of the workoroder to remove
 */
function remove(workflowToRemove) {

  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.DONE_PREFIX, workflowToRemove.id));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.ERROR_PREFIX, workflowToRemove.id));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.REMOVE),  {id: workflowToRemove.id, topicUid: workflowToRemove.id});

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Starting the synchronisation process for workflows.
 */
function start() {

  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.START, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.START, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.START));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Stopping the synchronisation process for workflows.
 */
function stop() {
  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.STOP, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.STOP, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.STOP));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Forcing the workflows to sync to the remote store.
 */
function forceSync() {
  var donePromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.FORCE_SYNC, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.FORCE_SYNC, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.FORCE_SYNC));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Safe stop forces a synchronisation to the remote server and then stops the synchronisation process.
 * @returns {Promise}
 */
function safeStop() {
  return forceSync().then(stop);
}


/**
 * Waiting for the synchronisation process to complete to the remote cluster.
 */
function waitForSync() {
  return mediator.promise(workflowSyncSubscribers.getTopic(CONSTANTS.TOPICS.SYNC_COMPLETE));
}

function ManagerWrapper(_manager) {
  this.manager = _manager;
  var self = this;

  var methodNames = ['create', 'read', 'update', 'delete', 'list', 'start', 'stop', 'safeStop', 'forceSync', 'waitForSync'];
  methodNames.forEach(function(methodName) {
    self[methodName] = function() {
      return q.when(self.manager[methodName].apply(self.manager, arguments));
    };
  });

  self.checkStatus = function() {
    return self.manager.checkStatus.apply(self.manager, arguments);
  };

  self.stepReview = function() {
    return self.manager.stepReview.apply(self.manager, arguments);
  };

  self.nextStepIndex = function() {
    return self.manager.nextStepIndex.apply(self.manager, arguments);
  };
}

/**
 *
 * This function checkes each of the result steps to determine if the workflow is complete,
 * and if not, what is the next step in the workflow to display to the user.
 *
 * @param {object} steps
 * @param {object} result
 * @returns {{nextStepIndex: number, complete: *}}
 */
function stepReview(steps, result) {
  var stepIndex = -1;
  var complete;
  if (result && result.stepResults && result.stepResults.length !== 0) {
    complete = true;
    for (var i=0; i < steps.length; i++) {
      var step = steps[i];
      var stepResult = result.stepResults[step.code];
      if (stepResult && (stepResult.status === CONSTANTS.STATUS.COMPLETE || stepResult.status === CONSTANTS.STATUS.PENDING)) {
        stepIndex = i;
        if (stepResult.status === CONSTANTS.STATUS.PENDING) {
          complete = false;
        }
      } else {
        break;
      }
    }
  }
  return {
    nextStepIndex: stepIndex,
    complete: complete // false is any steps are "pending"
  };
}

function nextStepIndex(steps, result) {
  return this.stepReview(steps, result).nextStepIndex;
}

/**
 *
 * Checking the status of a workorder
 *
 * @param {object} workorder  - The workorder to check status
 * @param {object} workflow   - The workflow to check status
 * @param {object} result     - The result to check status
 * @returns {*}
 */
function checkStatus(workorder, workflow, result) {
  var status;
  var stepReview = this.stepReview(workflow.steps, result);
  if (stepReview.nextStepIndex >= workflow.steps.length - 1 && stepReview.complete) {
    status = CONSTANTS.STATUS.COMPLETE_DISPLAY;
  } else if (!workflow.assignee) {
    status = CONSTANTS.STATUS.UNASSIGNED_DISPLAY;
  } else if (stepReview.nextStepIndex < 0) {
    status = CONSTANTS.STATUS.NEW_DISPLAY;
  } else {
    status = CONSTANTS.STATUS.PENDING_DISPLAY;
  }
  return status;
}


/**
 *
 * Initialising the workflow-client with a mediator.
 *
 * @param _mediator
 * @returns {ManagerWrapper|*}
 */
module.exports = function(_mediator) {

  //If there is already a manager, use this
  if (manager) {
    return manager;
  }

  mediator = _mediator;

  workflowSyncSubscribers = new MediatorTopicUtility(mediator);
  workflowSyncSubscribers.prefix(CONSTANTS.SYNC_TOPIC_PREFIX).entity(CONSTANTS.WORKFLOWS_ENTITY_NAME);

  manager = new ManagerWrapper({
    create: create,
    update: update,
    list: list,
    delete: remove,
    start: start,
    stop: stop,
    read: read,
    safeStop: safeStop,
    forceSync: forceSync,
    publishRecordDeltaReceived: _.noop,
    waitForSync: waitForSync,
    datasetId: CONSTANTS.WORKFLOWS_ENTITY_NAME,
    stepReview: stepReview,
    nextStepIndex: nextStepIndex,
    checkStatus: checkStatus
  });

  return manager;
};