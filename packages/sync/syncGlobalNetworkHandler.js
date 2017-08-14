var cloudURL;
var cloudPath;
var cidProvider = require('./clientIdProvider');

module.exports = function createHandler(cloudURL, cloudPath, $http) {
  var handler = function(params, success, failure) {
    var url = cloudURL + cloudPath + params.dataset_id;
    var payload = params.req;
    payload.__fh = {
      cuid: cidProvider.getClientId()
    };

    $http.post(url, payload, {}).then(success).catch(failure);
  };
  return handler;
};
