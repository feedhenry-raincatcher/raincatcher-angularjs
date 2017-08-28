var keycloakConfig = require('./keycloakConfig');
var initConfig = require('./keycloakInitConfig');

require('@raincatcher/angularjs-auth-keycloak')('wfm-mobile', keycloakConfig, initConfig);