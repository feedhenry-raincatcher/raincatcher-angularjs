var config = require('../app/config/config');

require('@raincatcher/demo-auth-keycloak')('wfm-mobile', config.keycloakConfig, config.keycloakInitConfig);