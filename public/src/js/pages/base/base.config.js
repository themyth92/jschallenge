(function wrapper(angular) {
  'use strict';
  angular.module('pages.base')
    .config(config);

  function config($stateProvider) {
    $stateProvider.state('base', {
      url : '',
      abstract : true,
      template: '<ui-view/>',
      resolve : {
        baseRouteResolve : baseRouteResolve
      }
    });
  }

  function baseRouteResolve($timeout) {
    return $timeout(function() {
      return;
    }, 1000);
  }

  config.$inject = ['$stateProvider'];
  baseRouteResolve.$inject = ['$timeout'];
})(angular);
