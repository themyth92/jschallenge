(function wrapper(angular) {
  'use strict';
  angular.module('pages.bookingEdit', [
    'app.core',

    'components.bookingTimer',
    'services.util',
    'components.carParkRemoveModal'
  ]);
})(angular);
