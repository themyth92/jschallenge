'use strict'
module.exports = function concat() {
  return {
    options : {
      separator: ';',
      banner : '/* <%= grunt.template.today("yyyy-mm-dd") %> */'
    },

    build : {
      src : ['public/src/js/app.core.js',
             'public/temp/js/template.js',
             'public/src/js/services/appData.service.js',
             'public/src/js/services/routeResolver.service.js',
             'public/src/js/services/map.service.js',
             'public/src/js/services/util.service.js',
             'public/src/js/components/spinner.directive.js',
             'public/src/js/components/readmore.directive.js',
             'public/src/js/components/bookingTimer.directive.js',
             'public/src/js/components/carParkRemoveModal.controller.js',
             'public/src/js/layouts/topnav.directive.js',
             'public/src/js/layouts/pageSwitcher.directive.js',
             'public/src/js/layouts/pageWrapperAdjust.directive.js',
             'public/src/js/pages/base/base.module.js',
             'public/src/js/pages/base/base.config.js',
             'public/src/js/pages/carParks/carParks.module.js',
             'public/src/js/pages/carParks/carParks.config.js',
             'public/src/js/pages/carParks/carParks.controller.js',
             'public/src/js/pages/carParks/mapAdjust.directive.js',
             'public/src/js/pages/carParks/carParkDetails.directive.js',
             'public/src/js/pages/bookings/bookings.module.js',
             'public/src/js/pages/bookings/bookings.config.js',
             'public/src/js/pages/bookings/bookings.controller.js',
             'public/src/js/pages/bookingEdit/bookingEdit.module.js',
             'public/src/js/pages/bookingEdit/bookingEdit.config.js',
             'public/src/js/pages/bookingEdit/bookingEdit.controller.js',
             'public/src/js/app.module.js',
             'public/src/js/app.config.js'],
      dest : 'public/temp/js/build.js'
    }
  }
}
