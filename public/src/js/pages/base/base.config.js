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
        baseRouteResolver : baseRouteResolver
      }
    });
  }

  function baseRouteResolver(routeResolver) {
    return routeResolver.baseRoute();
  }

  config.$inject = ['$stateProvider'];
  baseRouteResolver.$inject = ['routeResolver'];
})(angular);
