const request = require('request-promise-native');
const pageConstants = require('../../data/page_constants');
const jar = require('./auth').jar;

const stepsDefinitions = {
  vehicleInspection: {
    code: 'vehicle-inspection',
    description: 'Perform Vehicle Inspection and log results',
    templates: {
      form: '<vehicle-inspection-form></vehicle-inspection-form>',
      view: '<vehicle-inspection></vehicle-inspection>'
    },
    id: 'Sk4zrQ6qY'
  }
}

function create(title) {
  return request({
    url: `${pageConstants.api}api/workflows`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    body: {
      steps: [], 
      title
    },
    jar,
    json: true
  });
}

function read(workflowId) {
  return request({
    url: `${pageConstants.api}api/workflows/${workflowId}`,
    jar,
    json: true
  });
}

function remove(workflowId) {
  return request({
    url: `${pageConstants.api}api/workflows/${workflowId}`,
    method: 'DELETE',
    jar
  });
}

function removeByName(workflow) {
  return list()
    .then(workflows => workflows.data.find(w => w.title === workflow))
    .then(w => request({
      url: `${pageConstants.api}api/workflows/${w.id}`,
      method: 'DELETE',
      jar
    }));
}

function list() {
  return request({
    url: `${pageConstants.api}api/workflows?size=100`,
    jar,
    simple: false,
    json: true
  });
}

function addStep(name, stepCode, workflowId) {
  return read(workflowId)
    .then(workflow => {
      stepsDefinitions[stepCode].name = name;
      workflow.steps.push(stepsDefinitions[stepCode]);
      return request({
        url: `${pageConstants.api}api/workflows/${workflowId}`,
        method: 'PUT',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: workflow,
        jar,
        json: true
      });
    });
}

module.exports = {
  create,
  read,
  remove,
  removeByName,
  list,
  addStep
}