(function wrapper(angular) {
  'use strict';
  angular.module('layouts.pageWrapperAdjust', [])
    .directive('pageWrapperAdjust', pageWrapperAdjust);

  function pageWrapperAdjust($document, $window) {
    var directive = { 
      link : link,
      restrict : 'A'
    };

    return directive;

    //---------------------
    function link(scope, elem) {
      var body = $document[0].body;
      var window = angular.element($window);

      pageWrapperResize();
      window.bind('resize', onResize);

      //------------------------
      function onResize() {
        pageWrapperResize();
      }

      function pageWrapperResize() {
        var bodyHeight = body.offsetHeight;

        elem.css('min-height', bodyHeight + 'px');
      }
    }
  }

  pageWrapperAdjust.$inject = ['$document', '$window'];
})(angular);
