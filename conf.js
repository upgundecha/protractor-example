exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    './specs/spec.js',
    './specs/todo-spec.js',
    './specs/example-spec.js',
    './specs/example-spec-ddt.js',
    './specs/das-boot-spec.js'
  ],
  multiCapabilities: [
    {
      browserName: 'chrome'
    }],
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  },
  onPrepare: function () {
    var HtmlReporter = require('protractor-beautiful-reporter');
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    var jasmineReporters = require('jasmine-reporters');
    
    // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'tmp/screenshots',
      preserveDirectory: false
    }).getJasmine2Reporter());
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));

    var junitReporter = new jasmineReporters.JUnitXmlReporter({

      // setup the output path for the junit reports
      savePath: 'output/',

      // conslidate all true:
      //   output/junitresults.xml
      //
      // conslidate all set to false:
      //   output/junitresults-example1.xml
      //   output/junitresults-example2.xml
      consolidateAll: true
    });
    jasmine.getEnv().addReporter(junitReporter);
  }
}                   