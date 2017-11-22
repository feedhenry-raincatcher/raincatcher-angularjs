var Promise = require('bluebird');
/**
 * Helper method fetch base url for the server using feedhenry library.
 */
module.exports = function getUrl($fh) {
  return new Promise(function(resolve, reject) {
    // Get server url
    $fh.on('fhinit', function(error) {
      if (error) {
        return reject(error);
      }
      return resolve(decodeURIComponent($fh.getCloudURL()));
    });
  });
};

