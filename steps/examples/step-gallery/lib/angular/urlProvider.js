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
      resolve(decodeURIComponent($fh.getCloudURL()));
    });
  });
}

