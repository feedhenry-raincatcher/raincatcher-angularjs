module.exports = {
  HASH: '#',
  login: {
    URL: {
      MOBILE: 'http://localhost:9002/?url=http://localhost:8001#!/workflow',
      PORTAL: 'http://localhost:9003/?url=http://localhost:8001#!/workflow'
    }
    DEFAULT_HEADING: 'FeedHenry Workforce Management',
    USERNAME_LABEL_MSG: 'Username or email',
    PASSWORD_LABEL_MSG: "Password",
    AUTH_FAIL_MSG: 'Invalid credentials',
  },
  logout: {
    URL: '/login',
    DEFAULT_BODY: 'Trouble logging in? Contact the switchboard.'
  }
  workflows: {
    URL: '/workflows/list',
    URL_NEW: '/workflows/list/workflows/',
    DEFAULT_HEADING: "No workflow selected.",
    // DEFAULT_BODY: "Select a workflow from the menu, or create a new workflow:"
    DEFAULT_BODY: "Select a workflow from the menu.",
    TITLE_MISSING_MSG: 'A title is required.'
  },
  workorders: {
    URL: '/workorders/list',
    mobile: {
      DEFAULT_HEADING: 'Workorders'
    },
    portal: {
      URL_NEW: '/workorders/list/new',
      DEFAULT_HEADING: "No workorder selected.",
      DEFAULT_BODY: "Select a workorder from the menu, or create a new workorder:",
      WORKFLOW_MISSING_MSG: 'A workflow is required.',
      TITLE_MISSING_MSG: 'A title is required.',
      ADDRESS_MISSING_MSG: 'An address is required.',
      LATITUDE_MISSING_MSG: 'An lattitude is required.',
      LONGITUDE_MISSING_MSG: 'An longitude is required.',
      FINISH_DATE_MISSING_MSG: 'A finish date is required.',
      FINISH_TIME_MISSING_MSG: 'A finish date is required.',
      SUMMARY_MISSING_MSG: 'A summary date is required.'
    }
  }
};