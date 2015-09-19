(function wrapper(angular) {
  'use strict';
  angular.module('layouts.pageSwitcher', [
    'app.core'
  ])
    .directive('pageSwitcher', pageSwitcher);

  function pageSwitcher($state) {
    var directive = { 
      link : link,
      templateUrl : '/js/layouts/pageSwitcher.tpl.html',
      replace : true,
      transclude : true,
      scope : {},
      restrict : 'E'
    };

    return directive;

    //----------------------
    function link(scope, elem) {
      scope.pageLoading = true;
      scope.pageLoadedSuccess = false;
      init();

      //----------------------
      function init() {
        scope.$on('$stateChangeStart', onStateChangeStart);
        scope.$on('$stateChangeError', onStateChangeError);
        scope.$on('$stateChangeSuccess', onStateChangeSuccess);
      }

      function onStateChangeStart() {

        // reset state
        scope.pageLoading = true;
        scope.pageLoadedSuccess = false;
      }

      function onStateChangeError(evt, toState, toParams, fromState, fromParams, error) {

        // unhandled error routing
        // this will cause loading happen infinitely
      }

      function onStateChangeSuccess() {
        scope.pageLoading = false;
        scope.pageLoadedSuccess = true;
      }
    }
  }

  pageSwitcher.$inject = ['$state'];
})(angular);
