'use strict';
module.exports = function ngtemplates() {
  return {
    dist : {
      src : 'js/**/*.tpl.html',
      dest : 'public/temp/js/template.js',
      cwd : 'public/src',
      options : {
        standalone : false,
        module : 'app.core',
        prefix: '/',
        htmlmin: {
          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true, 
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        }
      }
    }
  }
};
