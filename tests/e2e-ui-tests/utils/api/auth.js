const request = require('request-promise-native');
const pageConstants = require('../../data/page_constants');

let jar = request.jar();

function login(username, password) {
  return request({
    url: `${pageConstants.api}cookie-login`,
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${username}&password=${password}`,
    jar,
    simple: false
  });
}

module.exports = {
  jar,
  login
};