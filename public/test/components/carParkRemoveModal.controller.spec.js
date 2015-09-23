'use strict';
describe('[ Unit components/carParRemoveModal.controller ]', function desc() {
  var scope;
  var vm;
  var modalInstance;
  var $timeout;

  beforeEach(function beforeEach() {
    module('test.template');
    module('components.carParkRemoveModal');
  });

  beforeEach(inject(function inject(_$rootScope_, _$controller_, _$timeout_) {
    var $rootScope = _$rootScope_;
    var $controller = _$controller_;

    $timeout = _$timeout_;
    modalInstance = {
      close: jasmine.createSpy('modalInstance.close'),
      dismiss: jasmine.createSpy('modalInstance.dismiss'),
      result: {
        then: jasmine.createSpy('modalInstance.result.then')
      }
    };

    scope = $rootScope.$new();
    $controller('CarParkRemoveModalController as CarParkRemoveModalController', 
                {$scope : scope, $modalInstance : modalInstance});

    vm = scope.CarParkRemoveModalController;
  }));

  it('should be defined', function test() {
    expect(vm).toBeDefined();
    expect(vm.view.disabled).toBeFalsy();
  });

  describe('{ method:confirm }', function desc() {
    afterEach(function afterEach() {
      $timeout.verifyNoPendingTasks();
    });

    it('should disabled button when `confirm` is executed', function test() {
      vm.confirm();
      expect(vm.view.disabled).toBeTruthy();
      $timeout.flush();
    });

    it('should reset view when `ajax finish` and call `modalInstance.close`', function test() {
      vm.confirm();
      $timeout.flush();
      expect(vm.view.disabled).toBeFalsy();
      expect(modalInstance.close).toHaveBeenCalled();
    });    
  });

  describe('{ method:cancel }', function desc() {
    it('should call `modalInstance.dismiss` when `cancel` is executed', function test() {
      vm.cancel();
      expect(modalInstance.dismiss).toHaveBeenCalled();
    });
  });
});
