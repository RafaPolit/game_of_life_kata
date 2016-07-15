'use strict';

var karma_files = require('./karma_files');

module.exports = function(config) {

  config.LOG_INFO

  config.set({

    files : karma_files,

    basePath : '',

    frameworks : ['jasmine'],

    preprocessors : {
      '**/scripts/**/!(*spec|app|main|fake_controller|upload_test_controller|md5).js': 'coverage'
    },

    coverageReporter : {
      type: 'text-summary', //'html' -> for html report, 'text-summary' -> for console report
      dir : 'coverage/'
    },

    // list of files to exclude
    exclude : [
    ],

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DISABLE,

    // test results reporter to use
    // possible values: dots || progress || growl
    reporters : ['progress', 'coverage'],

    // web server port
    port : 8080,

    // cli runner port
    runnerPort : 9100,

    // enable / disable colors in the output (reporters and logs)
    colors : true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : true,

    // Start these browsers, currently available:
    browsers : ['PhantomJS'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout : 5000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : false

  });
};
