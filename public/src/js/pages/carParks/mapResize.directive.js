(function wrapper(angular) {
  'use strict';
  angular.module('pages.carParks')
    .directive('mapResize', mapResize);

  function mapResize($document, $window) {

    // map adjustment based on window size
    var directive = {
      link : link,
      restrict : 'A'
    };

    return directive;

    //----------------------
    function link(scope, elem) {
      var body = $document[0].body;
      var mapCanvas = elem;
      var window = angular.element($window);
      var topnav = angular.element(body.querySelector('.navbar'))[0];

      // must resize the map when map is first time loaded
      mapResize();
      window.bind('resize', onResize);
      scope.$on('$destroy', onDestroy);

      //------------------------
      function onResize() {
        mapResize();
      }

      function mapResize() {
        var bodyHeight = body.offsetHeight;
        var topnavHeight = topnav.offsetHeight;
        var mapCanvasHeight = bodyHeight - topnavHeight;

        mapCanvas.css('height', mapCanvasHeight + 'px');
      }

      function onDestroy() {
        window.unbind('resize', mapResize);
      }
    }
  }

  mapResize.$inject = ['$document', '$window'];
})(angular);
