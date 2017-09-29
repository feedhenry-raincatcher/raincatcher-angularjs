const request = require('request-promise-native');
const pageConstants = require('../../data/page_constants');
const jar = require('./auth').jar;
const workflows = require('./workflows');
const users = require('./users');

function create(title, userId, workflowId) {
  return workflows.read(workflowId)
    .then(workflow =>
      request({
        url: `${pageConstants.api}api/workorders`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: {
          assignee: userId,
          title,
          workflow,
          id: 'Hz2mJYCq-',
          results: []
        },
        jar,
        json: true
      })
    );
}

function createByName(title, user, workflow) {
  let workflowId;
  return workflows.list()
    .then(wf => workflowId = wf.data.find(w => w.title === workflow).id)
    .then(() => users.filter(user))
    .then(u => {
      return create(title, u.users[0] && u.users[0].id, workflowId);
    });
}

function read(workorderId) {
  return request({
    url: `${pageConstants.api}api/workorders/${workorderId}`,
    jar,
    json: true
  });
}

function remove(workorderId) {
  return request({
    url: `${pageConstants.api}api/workorders/${workorderId}`,
    method: 'DELETE',
    jar
  });
}

function removeByName(workorder) {
  return list()
    .then(workorders => workorders.data.find(w => w.title === workorder))
    .then(w => request({
      url: `${pageConstants.api}api/workorders/${w.id}`,
      method: 'DELETE',
      jar
    }));
}

function list() {
  return request({
    url: `${pageConstants.api}api/workorders?size=100`,
    jar,
    simple: false,
    json: true
  });
}

module.exports = {
  create,
  createByName,
  read,
  remove,
  removeByName,
  list
};