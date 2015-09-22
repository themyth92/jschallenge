(function wrapper(angular){
  'use strict';
  angular.module('pages.carParks', [
    'app.core',

    'services.appData',
    'services.map',
    'services.util',

    'components.readmore',
    'components.bookingTimer',
    'components.carParkRemoveModal'
  ]);
})(angular);
