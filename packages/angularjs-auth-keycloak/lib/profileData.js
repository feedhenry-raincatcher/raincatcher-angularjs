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

module.exports = formatProfileData;
