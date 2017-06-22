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
var mediator, manager, workorderSyncSubscribers;

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
 * Creating a new workorder.
 *
 * @param {object} workorderToCreate - The Workorder to create.
 */
function create(workorderToCreate) {

  //Creating a unique channel to get the response
  var topicUid = shortid.generate();

  var topicParams = {topicUid: topicUid, itemToCreate: workorderToCreate};

  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.DONE_PREFIX, topicUid));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.CREATE, CONSTANTS.ERROR_PREFIX, topicUid));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.CREATE), topicParams);

  return getTopicPromises(donePromise, errorPromise);
}

/**
 *
 * Updating an existing workorder.
 *
 * @param {object} workorderToUpdate - The workorder to update
 * @param {string} workorderToUpdate.id - The ID of the workorder to update
 */
function update(workorderToUpdate) {
  var topicParams = {topicUid: workorderToUpdate.id, itemToUpdate: workorderToUpdate};

  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.DONE_PREFIX, topicParams.topicUid));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.UPDATE, CONSTANTS.ERROR_PREFIX, topicParams.topicUid));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.UPDATE), topicParams);

  return getTopicPromises(donePromise, errorPromise);
}

/***
 *
 * Reading a single workorder.
 *
 * @param {string} workorderId - The ID of the workorder to read
 */
function read(workorderId) {
  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.READ, CONSTANTS.DONE_PREFIX, workorderId));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.READ, CONSTANTS.ERROR_PREFIX, workorderId));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.READ), {id: workorderId, topicUid: workorderId});

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Listing All Workorders
 */
function list() {
  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.LIST, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.LIST));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 *
 * Removing a workororder using the sync topics
 *
 * @param {object} workorderToRemove
 * @param {string} workorderToRemove.id - The ID of the workoroder to remove
 */
function remove(workorderToRemove) {

  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.DONE_PREFIX, workorderToRemove.id));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.REMOVE, CONSTANTS.ERROR_PREFIX, workorderToRemove.id));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.REMOVE),  {id: workorderToRemove.id, topicUid: workorderToRemove.id});

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Starting the synchronisation process for workorders.
 */
function start() {

  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.START, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.START, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.START));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Stopping the synchronisation process for workorders.
 */
function stop() {
  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.STOP, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.STOP, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.STOP));

  return getTopicPromises(donePromise, errorPromise);
}

/**
 * Forcing the workorders to sync to the remote store.
 */
function forceSync() {
  var donePromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.FORCE_SYNC, CONSTANTS.DONE_PREFIX));

  var errorPromise = mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.FORCE_SYNC, CONSTANTS.ERROR_PREFIX));

  mediator.publish(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.FORCE_SYNC));

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
  return mediator.promise(workorderSyncSubscribers.getTopic(CONSTANTS.TOPICS.SYNC_COMPLETE));
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
}


/**
 *
 * Initialising the workorder-client with a mediator.
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

  workorderSyncSubscribers = new MediatorTopicUtility(mediator);
  workorderSyncSubscribers.prefix(CONSTANTS.SYNC_TOPIC_PREFIX).entity(CONSTANTS.WORKORDER_ENTITY_NAME);

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
    datasetId: CONSTANTS.WORKORDER_ENTITY_NAME
  });

  return manager;
};