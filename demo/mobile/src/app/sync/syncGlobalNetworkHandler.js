module.exports = function createHandler(cloudURL, cloudPath, $http) {
  var handler = function(params, success, failure) {
    var url = cloudURL + cloudPath + params.dataset_id;
    var payload = params.req;
    $http.post(url, payload).then(function(response) {
      success(response.data);
    }).catch(function(err) {
      failure(new Error(err));
    });
  };
  return handler;
};
