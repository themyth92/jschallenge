(function wrapper(angular) {
  'use strict';
  angular.module('components.spinner', [])
    .directive('spinner', spinner);

  function spinner() {
    var directive = {
      link : link,
      templateUrl : '/js/components/spinner.tpl.html',
      restrict : 'E',
      replace : true
    };

    return directive;

    //--------------------------
    function link(scope, elem, attrs) {
      var spinRadius = attrs.spinRadius || 11;

      elem.css({
        width : spinRadius*2 + 'px',
        height : spinRadius*2 + 'px'
      });
    }
  }
})(angular);
