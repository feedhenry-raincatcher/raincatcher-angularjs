module.exports = {
  ngModule: require('./angular'),
  definition: {
    code: 'accident-report-form',
    name: "Accident Report Form",
    description: "Form used to report vehicle accidents",
    templates: {
      form: "<accident-report-form></accident-report-form>",
      view: "<accident-report value='result.submission'></accident-report>"
    }
  }
};
