var logger = require('@raincatcher/logger').getLogger();

module.exports = function(appName, keycloakConfig, initConfig) {
  if (keycloakConfig && initConfig) {
    require('./lib/keycloakInit')(appName, keycloakConfig, initConfig);
    require('./lib/authInterceptor')(appName);
  } else {
    logger.error('Keycloak configuration not provided. Please provide a Keycloak configuration in order to initialize it');
  }
};