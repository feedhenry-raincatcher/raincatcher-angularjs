const request = require('request-promise-native');
const pageConstants = require('../../data/page_constants');
const jar = require('./auth').jar;

function filter(username) {
  return request({
    url: `${pageConstants.api}api/users?filter=${username}&limit=20`,
    jar,
    json: true
  });
}

module.exports = {
  filter
};