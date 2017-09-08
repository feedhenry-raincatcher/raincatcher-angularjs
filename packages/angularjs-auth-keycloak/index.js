var logger = require('@raincatcher/logger').getLogger();

module.exports = function(appName, keycloakConfig, initConfig) {
  if (keycloakConfig && initConfig) {
    require('./keycloakInit')(appName, keycloakConfig, initConfig);
    require('./authInterceptor')(appName);
  } else {
    logger.error('Keycloak configuration not provided. Please provide a Keycloak configuration in order to initialize it');
  }
};