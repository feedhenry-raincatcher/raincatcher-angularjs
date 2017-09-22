var logger = require('@raincatcher/logger').getLogger();

module.exports = {
  interceptor: require('./lib/authInterceptor'),
  init: require('./lib/keycloakInit'),
  KeycloakAuth: require('./lib/keycloakAuth')
}
