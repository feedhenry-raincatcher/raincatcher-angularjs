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
This is useful for organising where the lists will be rendered on-screen.
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


## Topics

As part of rendering Workflows, this module publishes and subscribes to several topics.
These topics can be implemented in your application or you can use the fh-wfm-workflow module that already has implementations for these topics.

### Published Topics

Each of the following topics subscribes to the `error` and `done` topics.
If the parameter includes a `topicUid`, the error topic should have the `topicUid` appended to the `done` or `error` topic.

| Topic | Parameters |
| ---- | ----------- |
| *wfm:workflows:list* | NONE |
| *wfm:workflows:read* | `{id: "IDOFWORKFLOW", topicUID: "IDOFWORKFLOW"}` |
| *wfm:workflows:create* | `{ workflowToCreate: workflowToCreate, topicUid: topicUid}` |
| *wfm:workflows:update* | `{ workflowToUpdate: workflowToCreate, topicUid: topicUid}` |
| *wfm:workflows:remove* | `{ id: "IDOFWORKFLOW, topicUid: "IDOFWORKFLOW"}` |
| *wfm:workorders:list* | NONE |

#### Step Topics

The following topics allow the updating of the workflow state to progress through a workflow.

Each of the `done` topics for the following topics contin the following parameters


```
{
    workflow: {
      //The details of the current workflow being progressed
    },
    workorder: {
      //The details of the current workorder being progressed
    },
    result: {
      //The current result object for this workorder being progressed
    },
    nextStepIndex: 0 //The index of the next step to display
    step: {
        //The details of the step to display
    }
}
```

| Topic | Parameters |
| ---- | ----------- |
| *wfm:workflows:step:begin*| `{workorderId: "WORKORDERID", topicUid: "WORKORDERID"}` |
| *wfm:workflows:step:summary*| `{workorderId: "WORKORDERID", topicUid: "WORKORDERID"}` |
| *wfm:workflows:step:previous*| `{workorderId: "WORKORDERID", topicUid: "WORKORDERID"}` |
| *wfm:workflows:step:complete*| `{workorderId: "WORKORDERID", topicUid: "WORKORDERID", submission: {...}, stepCode: "CODEOFCOMPLETEDSTEP"}` |

## Development

Install module dependencies
    
      npm install

Link module into your app

      npm link .

Start monitor changes in templates.

      grunt wfmTemplate:watch
