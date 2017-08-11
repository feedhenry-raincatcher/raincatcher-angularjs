var keycloakConfig = require('./keycloakConfig');
var initConfig = require('./keycloakInitConfig');

require('@raincatcher/demo-auth-keycloak')('wfm-mobile', keycloakConfig, initConfig);