# Raincatcher Workflow Angular User Interface

This module is an Angular JS implementation of Workflows for the Raincatcher project.

## Setup

This module is packaged in a CommonJS format, exporting the name of the Angular namespace.
The module can be included in an angular.js as follows:

```javascript
var config = {
  mode: 'admin',
  listColumnViewId: 'listColumnView',
  mainColumnViewId: 'detailColumnView'
};

angular.module('app', [
...
, require('fh-wfm-workflow-angular')(config)
...
])
```

### Configuration Options

The following configuration options are available for this module:

#### mode (Required)

Allows to switch between user based views and admin views. Possible values 'admin' or 'user'

#### mainColumnViewId (Required)

This is the identifier for the Angular view where the main Workflow views will be rendered.

#### listColumnViewId (Optional)

This is the identifier for the Angular view where the list of Workflows will be rendered into.
This is useful for organizing where the lists will be rendered on-screen.
If not specified, the lists will be rendered into the `mainColumnViewId`.
This is only used for the `admin` mode of the module.

#### toolbarViewId (User Required)

This is the identifier of the Angular view where the progress of a workflow is displayed to the user.
This is only required for scenarios where a workflow is being progressed (e.g. in a mobile application)

### Workflow Directives

| Name | Description |
| ---- | ----------- |
| workflow-detail | Displays the workflow to the user and allows re-ordering of the steps. |
| workflow-form | Allows editing of the workflow name |
| workflow-list | Displays a list of workflows |
| workflow-progress | Displays the current progress of a workflow |
| workflow-result | Displays the result of a single workflow |
| workflow-step-detail | Displays the detail for a single step of a workflow |
| workflow-step-form | Allows the user to edit a single step of the workflow |

### Workflow Step Process

The following directives are used to guide a user through the steps necessary to complete a workflow.
The workflow module itself does not contain the logic required for each step, but uses the template directives to render each of the steps to the user.

The `workflow-process-parent` route is an Angular JS abstract route that is used for all steps in a workflow.

The `workflow-process-begin` route and controller are used to display the summary of the workflow and any results that there may be.

The `workflow-process-steps` route publishes topics to get the current state of the workflow for a workorder.
Based on the state, the `workflow-step` directive renders the template defined in the workflow step.
At this point, control is passed to the module that implements the individual step.

## Development

Install module dependencies

      npm install

Link module into your app

      npm link .

Start monitor changes in templates.

      grunt wfmTemplate:watch
