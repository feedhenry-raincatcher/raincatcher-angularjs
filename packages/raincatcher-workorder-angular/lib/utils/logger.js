var _ = require('lodash');
var name = require('../../package.json').name;
var path = require('path').normalize(__dirname +'/../../');

/**
 * Function returning debug logger with prebuild signature
 * @param filePath path of the file where logger will be used
 */
module.exports = function setupLogger(filePath) {
  var str = filePath.substring(filePath.indexOf(path)).replace(path, name+':');
  return require('debug')(_.trim(str.split('/').join(':'), '.js') + ':');
};
