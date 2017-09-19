module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    eslint: {
      src: ["lib/**/*.js"]
    },
    wfmTemplate: {
      module: "wfm.ui.extensions",
      templateDir: "lib/templates",
      outputDir: "lib/dist"
    }
  });
  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.loadNpmTasks("grunt-eslint");
  grunt.registerTask('default', ['eslint']);
};
