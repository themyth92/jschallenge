(function wrapper(angular, _) {
  'use strict';
  angular.module('pages.carParks')
    .directive('carParkDetails', carParkDetails);

  function carParkDetails($timeout, $modal, appData, util) {
    var directive = { 
      link : link,
      templateUrl : '/js/pages/carParks/carParkDetails.tpl.html',
      restrict : 'E',
      replace : true
    };

    return directive;

    //------------------
    function link(scope, elem) {

      // method
      scope.openBookingTimer = openBookingTimer;
      scope.confirm = confirm;
      scope.cancel = cancel;
      scope.close = close;
      scope.remove = remove;

      // this event will be triggered when user select marker
      scope.$on('event::carParkSelect', onCarParkSelect);
      init();

      //-----------------------------
      function onCarParkSelect(evt, params) {
        var carParkID = params.carParkID;

        // show panel
        scope.view.showPanel = true;

        // find carpark object inside appData model
        scope.model = appData.findCarPark(carParkID);
        refreshControllerView();
        refreshControllerTempData();
      }

      function openBookingTimer() {

        // update view
        scope.view.showBookingTimer = true;
      }

      function confirm() {
        var startDate = scope.data.booking.startDate;
        var endDate = scope.data.booking.endDate;
        var price = scope.data.booking.price;

        // only allow confirm when all input is set correctly and price > 0
        if(_.isDate(startDate) && _.isDate(endDate) && price > 0) {
          
          // disabled all btn and input
          scope.view.isBookingSubmit = true;
          
          // fake sending data to server
          return $timeout(function timeout() {
              
            // update model
            scope.model.booking.startDate = util.toISOString(startDate);
            scope.model.booking.endDate = util.toISOString(endDate);

            // if user wants to change startDate and endDate of already booked 
            // carPark, we should not minus -1 cars_available
            // This case only happends when {showBookingPanel} is set to false
            if(scope.view.showBookingPanel) {
              scope.model.cars_available -= 1;  
            }

            refreshControllerView();
          }, 1000);
        }
      }

      function cancel() {
        refreshControllerView();
        refreshControllerTempData();
      }

      function close() {

        // reset everything
        init();
      }

      function remove() {

        // open modal
        scope.data.modalInstance = $modal.open({
          size : 'sm',
          templateUrl : '/js/components/carParkRemoveModal.tpl.html',
          controller : 'CarParkRemoveModalController as CarParkRemoveModalController'
        });
        
        scope.data.modalInstance.result.then(function then() {

          // remove car park booking model
          scope.model.booking.startDate = null;
          scope.model.booking.endDate = null;

          // must add +1 to cars_available when this booking carpark 
          // has been removed from user account
          scope.model.cars_available += 1;
          refreshControllerTempData();
          refreshControllerView();
        }); 
      }

      function refreshControllerTempData() {

        // get temp data startDate and endDate from model when this car park has 
        // been booked before
        if(scope.model.booking.startDate !== null && scope.model.booking.endDate !== null) {

          // refresh back to its data by model
          scope.data.booking.startDate = new Date(scope.model.booking.startDate);
          scope.data.booking.endDate = new Date(scope.model.booking.endDate);
          scope.data.booking.price =  (scope.data.booking.endDate.getHours() - scope.data.booking.startDate.getHours())*scope.model.pricePerHour;
        } else {

          // by default, startDate and endDate is set to tomorrow at 00:00:00 AM
          var tomorrow = util.getDefaultTomorrow();

          scope.data.booking.startDate = tomorrow;
          scope.data.booking.endDate = tomorrow;
          scope.data.booking.price = 0;
        }

        scope.data.modalInstance = null;
      }

      function refreshControllerView() {
        
        // if user has booked this carPark
        // booking panel will not show
        if(scope.model.booking.startDate !== null && scope.model.booking.endDate !== null) {
          scope.view.showBookingPanel = false;
        } else {

          // show booking panel
          scope.view.showBookingPanel = true;
        }

        scope.view.showBookingTimer = false;
        scope.view.isBookingSubmit = false;
      }

      function init() {

        // model
        scope.model = {};

        // view
        scope.view = {

          // big panel 
          showPanel : false,

          // change/inititate booking timer panel
          showBookingTimer : false,

          // it will show when user has not booked this carpark before
          showBookingPanel : false,

          // it will be set to true when user submit form
          isBookingSubmit : false
        };

        // temp data needed for controller
        scope.data = {
          tomorrow : util.getDefaultTomorrow(),
          booking : {
            startDate : null,
            endDate : null,
            price : null
          },

          modalInstance : null
        };
      }
    }
  }

  carParkDetails.$inject = ['$timeout', '$modal', 'appData', 'util'];
})(angular, _);
