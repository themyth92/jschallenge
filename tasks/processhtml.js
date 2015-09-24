'use strict';
module.exports = function htmlbuild() {
  return {
    build : {
      files : {
        'views/temp/index.ejs' : ['views/src/index.ejs']
      }
    }
  }
}
