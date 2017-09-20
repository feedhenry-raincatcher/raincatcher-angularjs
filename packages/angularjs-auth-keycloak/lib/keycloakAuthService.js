/**
 * Extract attribute fields from the profile data returned by Keycloak
 * @param attributeFields - Object which contains all the attributes of a user
 */
function extractAttributeFields(attributeFields) {
  var attributes = {};
  if (attributeFields) {
    for (var field in attributeFields) {
      if (attributeFields[field].length > 0) {
        attributes[field] = attributeFields[field][0];
      }
    }
  }
  return attributes;
}

/**
 * Formats profile data as expected by the application
 * @param profileData - Object which contains the profile data of a user
 */
function formatProfileData(profileData) {
  var profile;
  if (profileData) {
    profile = extractAttributeFields(profileData.attributes);
    profile.username = profileData.username;
    profile.email = profileData.email;
  }
  return profile;
}

//NOTE: This is not going to work, keycloakService is using up some things with
// the keycloakJS.
var KeycloakAuthService = function(keycloakService) {
  this.keycloakService = keycloakService;
};

KeycloakAuthService.prototype.getProfile = function() {
  var self = this;
  return new Promise(function(success, error) {
    self.keycloakService.loadUserProfile().success(function(profileData) {
      var userProfile = formatProfileData(profileData);
      localStorage.setItem('rc_profile', JSON.stringify(userProfile));
      return success(userProfile);
    }).error(function(err) {
      var userProfile = localStorage.getItem('rc_profile');
      if (userProfile) {
        try {
          userProfile = JSON.parse(localStorage.getItem('rc_profile'));
          return success(userProfile);
        } catch(error) {
          return error(error);
        }
      } else {
        return error(err);
      }
    });
  });
}

KeycloakAuthService.prototype.hasResourceRole = function(role) {
  return this.keycloakService.hasResourceRole(role);
}

KeycloakAuthService.prototype.login = function() {
  return this.keycloakService.login();
}
KeycloakAuthService.prototype.logout = function() {
  localStorage.clear();
  return this.keycloakService.logout();
}

KeycloakAuthService.prototype.setListener = function() {
  // NOTE: No need to listen to login/logout events for Keycloak as the login page is in a different page from the app itself.
}

module.exports = KeycloakAuthService;