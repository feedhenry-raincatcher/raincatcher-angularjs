var keycloakConfig = require('./keycloakConfig');
var initConfig = require('./keycloakInitconfig');

require('@raincatcher/demo-auth-keycloak')('wfm-mobile', keycloakConfig, initConfig);