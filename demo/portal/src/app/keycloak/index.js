var keycloakConfig = require('../../config.json');

require('@raincatcher/angularjs-auth-keycloak')('app', keycloakConfig.keycloak, keycloakConfig.keycloakInit);
