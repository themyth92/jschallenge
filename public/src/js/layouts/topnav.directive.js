(function wrapper(angular) {
  'use strict';
  angular.module('layouts.topnav', [])
    .directive('topnav', topnav);

  function topnav() {
    var directive = {
      restrict : 'E',
      templateUrl : '/js/layouts/topnav.tpl.html'
    };

    return directive;
  }
})(angular);
