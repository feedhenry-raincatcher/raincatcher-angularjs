var keycloakConfig = require('./keycloakConfig');
var initConfig = require('./keycloakInitConfig');

require('@raincatcher/demo-auth-keycloak')('app', keycloakConfig, initConfig);