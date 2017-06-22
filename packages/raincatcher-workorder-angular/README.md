# Raincatcher Workorder Angular User Interface

This module is an Angular JS implementation of Workorders for the Raincatcher project.

## Setup

This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript

var config = {
  mode: 'admin',
  listColumnViewId: 'listColumnView',
  detailColumnViewId: 'detailColumnView'
};

angular.module('app', [
...
, require('fh-wfm-workorder-angular')(config)
...
])
```

### Configuration Options

The following configuration options are available for this module:

#### Mode

The module can have two modes: `admin` and `user`. These modes affect what options are presented to the user in the directives.

E.g. If the module is in `user` mode, the user will not have the option to edit / delete workorders when viewing the workorder details.

#### mainColumnViewId (Required)

This is the identifier for the Angular view where the main Workorder views will be rendered.

#### listColumnViewId (Optional)

This is the identifier for the Angular view where the list of Workorders will be rendered into. This is useful for organising where the lists will be rendered on-screen. If not specified, the lists will be rendered into the `mainColumnViewId`.

### Workorder directives

| Name | Description |
| ---- | ----------- |
| workorder-list | Listing all of the Workorders with their current status |
| workorder | Listing the detail for a single Workorder |
| workorder-summary | Listing the detail for the workorder, along with the result, if completed. |
| workorder-form | A form for updating and deleting Workorders |

## Topics

As part of rendering Workorders, this module publishes and subscribes to several topics. These topics can be implemented in your application or you can use the fh-wfm-workorder module that already has implementations for these topics.

### Published Topics

Each of the following topics subscribes to the `error` and `done` topics. If the parameter includes a `topicUid`, the error topic should have the `topicUid` appended to the `done` or `error` topic.

| Topic | Parameters |
| ---- | ----------- |
| *wfm:workorders:list* | NONE |
| *wfm:workorders:read* | `{id: "IDOFWORKORDER", topicUID: "IDOFWORKORDER}` |
| *wfm:workorders:create* | `{ workorderToCreate: workorderToCreate, topicUid: topicUid}` |
| *wfm:workorders:update* | `{ workorderToUpdate: workorderToCreate, topicUid: topicUid}` |
| *wfm:workorders:remove* | `{ id: "IDOFWORKORDER, topicUid: "IDOFWORKORDER"}` |
| *wfm:workflows:list* | NONE |
| *wfm:workflows:read* | `{id: workflowId, topicUid: workflowId}` |
| *wfm:results:list* | NONE |
| *wfm:users:list* | NONE |
| *wfm:users:read* | `{id: userId, topicUid: userId}` |

