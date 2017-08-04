var config = require('../app/config/config');

require('./keycloakInit');
if (config.keycloakConfig) {
  require('./authInterceptor');
}
