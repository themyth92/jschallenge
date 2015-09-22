(function wrapper(angular) {
  'use strict';
  angular.module('components.carParkRemoveModal', [])
    .controller('CarParkRemoveModalController', CarParkRemoveModalController);

  function CarParkRemoveModalController($modalInstance) {
    var vm = this;

    this.confirm = confirm;
    this.cancel = cancel;

    //----------------------
    function confirm() {
      $modalInstance.close();
    }

    function cancel() {
      $modalInstance.dismiss();
    }
  }

  CarParkRemoveModalController.$inject = ['$modalInstance'];
})(angular);
