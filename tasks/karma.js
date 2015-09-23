'use strict';
module.exports = function karma() {
  return {
    options : {
      browsers: ['PhantomJS'],
      singleRun : true,
      frameworks: ['jasmine'],
      basePath : 'public/src/js/',
      logLevel : 'INFO',
      preprocessors: {
        '**/*.html': ['ng-html2js']
      },

      files : [
        
        // helper file for testing
        '../../test/helper/helper.js',

        // external libs
        'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.10.1/lodash.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.15/angular-ui-router.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.5/angular-mocks.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.4/ui-bootstrap-tpls.min.js',
        
        // app libs - no cdn
        {pattern  : '../libs/**/*.js', watched : false, included : true},

        'https://cdnjs.cloudflare.com/ajax/libs/angular-google-maps/2.2.1/angular-google-maps.min.js',

        // all html files
        '**/*.tpl.html',

        // app files
        'app.core.js',

        // services
        {pattern : 'services/*.js', watched : false, included : true},

        // components
        {pattern : 'components/*.js', watched : false, included : true},

        // layouts
        {pattern : 'layouts/*.js', watched : false, included : true},

        // pages
        'pages/base/base.module.js',
        {pattern : 'pages/base/*.js', watched : false, included : true},

        'pages/carParks/carParks.module.js',
        {pattern : 'pages/carParks/*.js', watched : false, included : true},

        // app
        'app.module.js',
        'app.config.js',

        {pattern : '../../test/**/*.spec.js', watched : false, included : true}
      ],

      ngHtml2JsPreprocessor: {
        prependPrefix : '/js/',
        moduleName : 'test.template'
      }
    },

    unit : {}
  }
}
