(function wrapper(angular, _) {
  'use strict';
  angular.module('pages.carParks')
    .directive('carParkDetails', carParkDetails);

  function carParkDetails($timeout, appData) {
    var directive = { 
      link : link,
      templateUrl : '/js/pages/carParks/carParkDetails.tpl.html',
      restrict : 'E',
      replace : true
    };

    return directive;

    //------------------
    function link(scope, elem) {
      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // method
      scope.close = close;
      scope.startBook = startBook;
      scope.stopBook = stopBook;
      scope.confirmBook = confirmBook;
      scope.changeBookingFrom = changeBookingFrom;
      scope.changeBookingTo = changeBookingTo;

      // model
      scope.model = {};

      // view
      scope.view = {
        carParkSelect : false,
        startBook : false,
        isSubmitting : false
      };

      // temp data
      scope.data = {
        tomorrow : tomorrow,
        booking : {from : new Date(), to : new Date(), price : 0} 
      };

      scope.$on('event::carParkSelect', onCarParkSelect);

      //-----------------
      function close() {
        scope.view.carParkSelect = false;
      }

      function startBook() {
        scope.view.startBook = true;
      }

      function stopBook() {
        scope.view.startBook = false;

        // reset everything
        var date = new Date();

        date.setHours(0);
        scope.data.booking.from = date;
        scope.data.booking.to = date;
        scope.data.booking.price = 0;
      }

      function confirmBook() {

        // validate data first before process
        if(_.isDate(scope.data.booking.from) && _.isDate(scope.data.booking.to) && scope.data.booking.price > 0) {

          // update view
          scope.view.isSubmitting = true;

          // fake sending data to server
          return $timeout(function timeout() {

            // update model
            scope.model.booking.from = scope.data.booking.from.getHours();
            scope.model.booking.to = scope.data.booking.to.getHours();

            // update view
            scope.view.isSubmitting = false;
          }, 2000)
        }
      }

      function changeBookingFrom() {
        if(_.isDate(scope.data.booking.from) && _.isDate(scope.data.booking.to)) {
          var from = scope.data.booking.from.getHours();
          var to = scope.data.booking.to.getHours();

          // we always want from < to
          if(from > to) {
            var date = new Date();

            date.setHours(from);

            // set "booking to" to be equal "booking from"
            scope.data.booking.to = date;
            to = from;
          } 

          // always update price
          scope.data.booking.price = scope.model.pricePerHour*(to - from);
        }
      }

      function changeBookingTo() {
        if(_.isDate(scope.data.booking.from) && _.isDate(scope.data.booking.to)) {
          var from = scope.data.booking.from.getHours();
          var to = scope.data.booking.to.getHours();

          // we always want from < to
          if(from > to) {
            var date = new Date();

            date.setHours(to);

            // set "booking from" to be equal "booking to"
            scope.data.booking.from = date;
            from = to;
          } 

          // always update price
          scope.data.booking.price = scope.model.pricePerHour*(to - from);
        }
      }

      function onCarParkSelect(evt, params) {
        var carParkID = params.carParkID;

        // show panel
        scope.view.carParkSelect = true;

        // find it inside appData
        scope.model = appData.findCarPark(carParkID);
        console.log(scope.model);

        // configure booking hours if it exist
        if(scope.model.booking.from !== null && scope.model.booking.to !== null) {

          // set data to be from to
        } else {

          // by default we will set both 2 timepicker from and to to be 00 -> 00
          var date = new Date();

          date.setHours(0);

          // must reset everything when user select different car park
          scope.data.booking.from = date;
          scope.data.booking.to = date;
          scope.data.booking.price = 0;
        }
      }
    }
  }

  carParkDetails.$inject = ['$timeout', 'appData'];
})(angular, _);
