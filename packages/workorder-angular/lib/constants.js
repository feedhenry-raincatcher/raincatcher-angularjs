module.exports = {
  TOPIC_TIMEOUT: 5000,
  WORKORDER_MODULE_ID: "wfm.workorder",
  WORKORDER_DIRECTIVE: "wfm.workorder.directives",
  WORKORDER_SERVICE: "wfm.workorder.services",
  TOPIC_PREFIX: "wfm",
  WORKORDER_ENTITY_NAME: "workorders",
  RESULTS_ENTITY_NAME: "results",
  WORKFLOWS_ENTITY_NAME: "workflows",
  USERS_ENTITY_NAME: "users",
  SYNC_TOPIC_PREFIX: "wfm:sync",
  ERROR_PREFIX: "error",
  DONE_PREFIX: "done",
  MODES: {
    ADMIN: 'admin',
    USER: 'user'
  },
  TOPICS: {
    CREATE: "create",
    UPDATE: "update",
    LIST: "list",
    REMOVE: "remove",
    READ: "read",
    START: "start",
    STOP: "stop",
    FORCE_SYNC: "force_sync",
    SYNC_COMPLETE: "sync_complete",
    DELTA_RECEIVED: "record_delta_received"
  }
};