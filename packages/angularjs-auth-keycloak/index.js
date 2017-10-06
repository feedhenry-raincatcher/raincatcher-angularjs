module.exports = {
  interceptor: require('./lib/authInterceptor'),
  init: require('./lib/keycloakInit'),
  KeycloakAuth: require('./lib/keycloakAuth')
};
