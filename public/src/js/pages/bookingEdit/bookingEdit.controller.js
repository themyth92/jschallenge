(function wrapper(angular, _) {
  'use strict';
  angular.module('pages.bookingEdit')
    .controller('BookingEditController', BookingEditController);

  function BookingEditController($stateParams, $state, $timeout, $modal, appData, util) {
    var carParkID = $stateParams.carParkID;
    var vm = this;

    // method
    vm.cancel = cancel;
    vm.confirm = confirm;
    vm.remove = remove;

    // model
    vm.model = appData.findCarPark(carParkID);

    // view
    vm.view = {
      isSubmitting : false
    };

    // temp data
    vm.data = {booking : {}};
    vm.data.booking.startDate = new Date(vm.model.booking.startDate);
    vm.data.booking.endDate = new Date(vm.model.booking.endDate);
    vm.data.booking.price = (vm.data.booking.endDate.getHours() - vm.data.booking.startDate.getHours())*vm.model.pricePerHour;
    vm.data.modalInstance = null;

    //-----------------
    function cancel() {

      // return to bookings page
      $state.go('base.bookings');
    }

    function confirm() {
      var startDate = vm.data.booking.startDate;
      var endDate = vm.data.booking.endDate;
      var price = vm.data.booking.price;

      // only allow confirm when all input is set correctly and price > 0
      if(_.isDate(startDate) && _.isDate(endDate) && price > 0) {
        
        // disabled all btn and input
        vm.view.isSubmitting = true;
        
        // fake sending data to server
        return $timeout(function timeout() {
            
          // update model
          vm.model.booking.startDate = util.toISOString(startDate);
          vm.model.booking.endDate = util.toISOString(endDate);
          vm.view.isSubmitting = false;

          // go back to bookings state
          $state.go('base.bookings');
        }, 1000);
      }
    }

    function remove() {

      // open modal
      vm.data.modalInstance = $modal.open({
        size : 'sm',
        templateUrl : '/js/components/carParkRemoveModal.tpl.html',
        controller : 'CarParkRemoveModalController as CarParkRemoveModalController'
      });

      vm.data.modalInstance.result.then(function then() {

        // remove car park booking model
        vm.model.booking.startDate = null;
        vm.model.booking.endDate = null;

        // when booked carpark has been removed from user,
        // add +1 to cars_available
        vm.model.cars_available += 1;

        // go back to booking state
        // need to reinitialize controller for the removal to take effect
        $state.go('base.bookings', {}, {reload: true}); 
      }); 
    }
  }

  BookingEditController.$inject = ['$stateParams', '$state', '$timeout', '$modal', 'appData', 'util'];
})(angular, _);
