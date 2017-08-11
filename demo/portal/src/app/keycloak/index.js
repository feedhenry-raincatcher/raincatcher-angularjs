var config = require('../../config/config');

require('@raincatcher/demo-auth-keycloak')('app', config.keycloakConfig, config.keycloakInitConfig);