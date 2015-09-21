(function wrapper(angular){
  'use strict';
  angular.module('pages.carParks', [
    'app.core',

    'services.appData',
    'services.map',

    'components.readmore'
  ]);
})(angular);
