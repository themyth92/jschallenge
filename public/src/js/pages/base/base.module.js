(function wrapper(angular) {
  'use strict';
  angular.module('pages.base', [
    'app.core',

    'services.routeResolver'
  ]);
})(angular);
