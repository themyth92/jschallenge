(function wrapper(angular) {
  'use strict';
  angular.module('pages.carParks')
    .directive('mapAdjust', mapAdjust);

  function mapAdjust($document, $window) {

    // map adjustment based on window size
    var directive = {
      link : link,
      restrict : 'A'
    };

    return directive;

    //----------------------
    function link(scope, elem) {
      var body = $document[0].body;
      var mapContainer = angular.element(elem[0].querySelector('.angular-google-map-container'));
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
        var mapContainerHeight = bodyHeight - topnavHeight - 1; //due to border-bottom on topnav

        mapContainer.css('height', mapContainerHeight + 'px');
      }

      function onDestroy() {
        window.unbind('resize', mapResize);
      }
    }
  }

  mapAdjust.$inject = ['$document', '$window'];
})(angular);
