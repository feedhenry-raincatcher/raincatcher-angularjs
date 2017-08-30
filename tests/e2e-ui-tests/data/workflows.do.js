var params = {
  WORKFLOW_TCREATE: 'create-wfw-crudl',
  WORKFLOW_TUPDATE1: 'update1-wfw-crudl',
  WORKFLOW_TUPDATE2: 'update2-wfw-crudl',
  WORKFLOW_TCANCEL: 'cancel-wfw-crudl',
  WORKFLOW_TDELETE: 'delete-wfw-crudl',
  WORKFLOW_TSEARCH: 'search-wfw-crudl'
};

var workflows = {
  CREATE: {
    title: params.WORKFLOW_TCREATE
  },
  UPDATE1: {
    title: params.WORKFLOW_TUPDATE1
  },
  UPDATE2: {
    title: params.WORKFLOW_TUPDATE2
  },
  CANCEL: {
    title: params.WORKFLOW_TCANCEL
  },
  DELETE: {
    title: params.WORKFLOW_TDELETE
  },
  SEARCH: {
    title: params.WORKFLOW_TSEARCH
  }
};

module.exports = {
  params, workflows
};
