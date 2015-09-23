(function wrapper(angular) {
  'use strict';
  angular.module('components.readmore', [])
    .directive('readmore', readmore);

  function readmore() {
    var directive = {
      link : link,
      templateUrl : '/js/components/readmore.tpl.html',
      restrict : 'E',
      scope : {
        text : '@'
      }
    };

    return directive;

    //----------------
    function link(scope, elem, attrs) {
      var limit = attrs.limit || 50;
      var moreText = attrs.moreText || 'Read more';
      var lessText = attrs.lessText || 'Less';

      scope.limit = limit;
      scope.moreText = moreText;
      scope.lessText = lessText;

      // default beginning text always be trimmed
      scope.fullText = false;
      scope.toggle = toggle;

      //--------------------
      function toggle() {
        scope.fullText = !scope.fullText;
      }
    }
  }
})(angular);
