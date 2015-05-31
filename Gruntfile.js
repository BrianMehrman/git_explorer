'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8000,
          protocol: 'http',
          keepalive: true,
          base: "app"
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });
  grunt.registerTask('default', []);
  grunt.registerTask('test', [
    'karma'
  ]);
}
