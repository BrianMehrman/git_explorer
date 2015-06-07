// Karma configuration
// Generated on Mon May 25 2015 13:43:32 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'app/js/vendor/d3.v3.min.js',
      'app/js/vendor/jquery.js',
      'spec/components/angular/angular.js',
      'spec/components/angular-mocks/angular-mocks.js',
      'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.14/angular-ui-router.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-route.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-resource.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular-cookies.js',
      'app/js/**/**.js',
      'spec/js/**/*.test.js',
      // fixtures
      {pattern: 'spec/support/mock/*.json', watched: true, served: true, included: false}
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
