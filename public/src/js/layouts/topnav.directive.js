(function wrapper(angular) {
  'use strict';
  angular.module('layouts.topnav', [
    'app.core'
  ])
    .directive('topnav', topnav);

  function topnav() {
    var directive = {
      restrict : 'E',
      templateUrl : '/js/layouts/topnav.tpl.html',
      replace : true
    };

    return directive;
  }
})(angular);
