'use strict';
module.exports = function htmlmin() {
  return {
    build : {                                      
      options : {                                 
        removeComments : true,
        collapseWhitespace : true
      },

      files: {                                   
        'views/build/index.ejs': 'views/temp/index.ejs'
      }
    }
  }
}
