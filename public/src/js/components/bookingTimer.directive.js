(function wrapper(angular, _) {
  'use strict';
  angular.module('components.bookingTimer', [
    'app.core',

    'services.util'
  ])
    .directive('bookingTimer', bookingTimer);

  function bookingTimer(util) {
    var directive = {
      link : link,
      templateUrl : '/js/components/bookingTimer.tpl.html',
      scope : {
        booking : '=',
        disabled : '=',
        price : '@'
      },

      restrict : 'E',
      replace : true
    };

    return directive;

    //----------------------
    function link(scope) {
      scope.changeBookingStart = changeBookingStart;
      scope.changeBookingEnd = changeBookingEnd;

      function changeBookingStart() {
        var startDate = scope.booking.startDate;
        var endDate = scope.booking.endDate;

        // we must ensure that start time always less than or equal end time
        // validate if start time and end time is a valid Date object
        if(_.isDate(startDate) && _.isDate(endDate)) {
          var startHour = startDate.getHours();
          var endHour = endDate.getHours();

          if(startHour > endHour) {

            // set the new endDate to be startDate
            var newEndDate = util.getDefaultTomorrow();

            newEndDate.setHours(startHour);
            scope.booking.endDate = newEndDate;
            startHour = endHour;
          }

          // also update price shown
          setBookingPrice(startHour, endHour);
        }
      }

      function changeBookingEnd() {
        var startDate = scope.booking.startDate;
        var endDate = scope.booking.endDate;

        // we must ensure that start time always less than or equal end time
        // validate if start time and end time is a valid Date object
        if(_.isDate(startDate) && _.isDate(endDate)) {
          var startHour = startDate.getHours();
          var endHour = endDate.getHours();

          if(startHour > endHour) {

            // set the new startDate to be endDate
            var newStartDate = util.getDefaultTomorrow();

            newStartDate.setHours(endHour);
            scope.booking.startDate = newStartDate;
            startHour = endHour;
          }

          // also update price shown
          setBookingPrice(startHour, endHour);
        } 
      }

      function setBookingPrice(startHour, endHour) {
        scope.booking.price = (endHour - startHour)*scope.price;
      }
    }
  }

  bookingTimer.$inject = ['util'];
})(angular, _);
