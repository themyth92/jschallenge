(function wrapper(angular) {
  'use strict';
  angular.module('pages.bookingEdit', [
    'app.core',

    'components.bookingTimer',
    'components.carParkRemoveModal',

    'services.util'
  ]);
})(angular);
