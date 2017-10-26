
module.exports = function getUrl(FhLibrary) {
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

