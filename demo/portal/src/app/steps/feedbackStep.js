var dynamicFormsStep = require('@raincatcher/step-dynamic-forms');

// Dynamic forms step that implements customer feedback
// form with email and name fields
// https://github.com/json-schema-form/angular-schema-form/blob/development/docs/index.md

// Form definition
var form = [
  "name",
  "email"
];

// Schema for validation and data definition
var schema = {
  "type": "object",
  "title": "Feedback",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "email": {
      "title": "Email",
      "type": "string",
      "pattern": "^\\S+@\\S+$",
      "description": "Email will be used to send feedback form."
    }
  },
  "required": [
    "name",
    "email"
  ]
}

var model = {};

var title = 'Customer feedback form';

module.exports = {
  ngModule: dynamicFormsStep.ngModule('feedback-step', title, schema, form, model),
  definition: dynamicFormsStep.definition
}
