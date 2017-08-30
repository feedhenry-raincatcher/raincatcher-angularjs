var _ = require('lodash');

module.exports.inherit = function(child, base, properties) {
  child.prototype = _.create(base.prototype, _.assign({
    '_super': base.prototype,
    'constructor': child
  }, properties));
};
