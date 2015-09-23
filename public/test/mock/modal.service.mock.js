(function wrapper(angular) {
  'use strict';
  angular.module('mock.services.modal', [])
    .factory('$modal', modal)
    .factory('$modalInstance', modalInstance);

  function modal() {
    var service = {
      open : jasmine.createSpy('service.open').and.returnValue(mockModal())
    };

    function mockModal() {
      return {
        result : {
          then : function then(confirmCallback, cancelCallback) {
            this.confirmCallback = confirmCallback;
            this.cancelCallback = cancelCallback;
          }
        },

        close : function close(item) {
          this.result.confirmCallback(item);
        },

        dismiss : function dismiss(type) {
          if(this.result.cancelCallback) {
            this.result.cancelCallback(type);  
          }
        }
      };
    }

    return service;
  }

  function modalInstance() {

  }
})(angular);
