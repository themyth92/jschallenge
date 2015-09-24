(function wrapper(angular) {
  'use strict';
  angular.module('components.carParkRemoveModal', [
    'app.core'
  ])
    .controller('CarParkRemoveModalController', CarParkRemoveModalController);

  function CarParkRemoveModalController($modalInstance, $timeout) {
    var vm = this;

    vm.confirm = confirm;
    vm.cancel = cancel;
    vm.view = {
      disabled : false
    };

    //----------------------
    function confirm() {
      vm.view.disabled = true;

      // create fake ajax request
      return $timeout(function timeout() {
        vm.view.disabled = false;
        $modalInstance.close();
      }, 1000);
    }

    function cancel() {
      $modalInstance.dismiss();
    }
  }

  CarParkRemoveModalController.$inject = ['$modalInstance', '$timeout'];
})(angular);
