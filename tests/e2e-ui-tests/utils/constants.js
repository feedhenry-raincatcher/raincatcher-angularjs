module.exports = {
  auth: {
    DEFAULT_PASSWORD: '123',
    INVALID_PASSWORD: 'xxx',
    NEW_PASSWORD: '12345',
    usernames: {
      TREVER_SMITH: 'trever',
      DAISY_DIALER: 'daisy',
      MAX_A_MILLION: 'max',
      PHYLIS_LEXY: 'phylis',
      JOHNNY_FIZAL: 'johnny',
      BILLY_BALLER: 'billy',
      SALLY_SHORER: 'sally',
      DANNY_DOORMAN: 'danny',
      INVALID_USER: 'invalid'
    },
    userFullName: {
      TREVER: 'Trever Smith',
      DAISY: 'Daisy Dialer'
    }
  },
  HASH: '#',
  login: {
    URL: '/login',
    DEFAULT_HEADING: 'FeedHenry WFM Demo',
    DEFAULT_BODY: 'Trouble logging in? Contact the switchboard.',
    AUTH_FAIL_MSG: 'Authentication Failed! Try Again.',
    VALUE_ATTRIBUTE: 'value',
    USERNAME_MISSING_MSG: 'A username is required.',
    PASSWORD_MISSING_MSG: 'A password is required.'
  },
  logout: {
    URL: '/login',
    DEFAULT_BODY: 'Trouble logging in? Contact the switchboard.'
  },
  schedule: {
    URL: '/schedule',
    schedulerCalendarButton: {
      TRIANGLE: 'triangle',
      ICON: 'icon'
    }
  },
  groups: {
    URL: '/groups',
    URL_NEW: '/groups/new',
    DEFAULT_HEADING: "No group selected.",
    DEFAULT_BODY: "Select a group from the menu, or create a new group:",
    NAME_MISSING_MSG: 'A name is required.',
  },
  workers: {
    URL: '/workers',
    URL_NEW:'/workers/new',
    DEFAULT_HEADING: "No worker selected.",
    DEFAULT_BODY: "Select a worker from the menu, or create a new worker:",
    NAME_MISSING_MSG: 'A name is required.',
    USERNAME_MISSING_MSG: 'A username is required.',
    PHONE_NUMBER_MISSING_MSG: 'A phone number is required.',
    EMAIL_MISSING_MSG: 'An email is required.',
    POSITION_MISSING_MSG: 'An position is required.',
    GROUP_MISSING_MSG: 'An group is required.',
  },
  workflows: {
    URL: '/workflows/list',
    URL_NEW: '/workflows/list/workflows/',
    DEFAULT_HEADING: "No workflow selected.",
    DEFAULT_BODY: "Select a workflow from the menu, or create a new workflow:",
    // DEFAULT_BODY: "Select a workflow from the menu.",
    TITLE_MISSING_MSG: 'A title is required.'
  },
  workorders: {
    URL: '/workorders/list',
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
  },
  files: {
    URL: '/files',
    URL_DETAIL: '/files/detail/'
  },
  dateFormat: {
    BIG_ENDIAN: "big-endian", // date format - 2017/01/21
    LITTLE_ENDIAN: "little-endian", // date format - 01/21/2017
    MIDDLE_ENDIAN: "middle-endian" // date format - 21/01/2017
  },
  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  monthsAbbreviations: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
};