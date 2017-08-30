var _ = require('lodash');
/**
 * Return promises from operation call on an each element
 * @param {*} elements to iterate through
 * @param {*} callFunc to be called on each element
 */
module.exports.all = function(elements, callFunc) {
  callFunc = callFunc || function(x) {
    return x;
  };
  var promises = _.map(elements, callFunc);
  return Promise.all(promises);
};

