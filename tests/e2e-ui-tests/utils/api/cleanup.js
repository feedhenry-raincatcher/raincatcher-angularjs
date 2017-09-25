const workflows = require('./workflows');
const workorders = require('./workorders');

module.exports = function(prefix) {
  return workflows.list()
    .then(w => {
      const toDelete = w.data.filter(workflow => workflow.title.startsWith(prefix));
      return toDelete.reduce(
        (p, workflow) => p.then(() => workflows.remove(workflow.id)),
        Promise.resolve()
      );
    })
    .then(() => workorders.list())
    .then(w => {
      const toDelete = w.data.filter(workorder => workorder.title.startsWith(prefix));
      return toDelete.reduce(
        (p, workorder) => p.then(() => workorders.remove(workorder.id)),
        Promise.resolve()
      );
    });
};