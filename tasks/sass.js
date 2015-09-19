'use strict';
module.exports = function sass() {
  return {
    src : {
      options : {
        sourcemap : 'none',
        noCache : true
      },

      files : {
        'public/src/css/style.css' : 'public/src/css/scss/style.scss'
      }
    }
  }
}
 
