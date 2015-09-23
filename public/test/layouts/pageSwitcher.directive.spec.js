'use strict';
describe('[ Unit layouts/pageSwitcher.directive ]', function desc() {
  var scope;
  var element;
  var $rootScope;
  var isolateScope;

  beforeEach(function beforeEach() {
    module('test.template');
    module('layouts.pageSwitcher');
  });

  beforeEach(inject(function inject(_$compile_, _$rootScope_) {
    var $compile = _$compile_;

    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    element = $compile('<page-switcher></page-switcher>')(scope);
    scope.$digest();
    isolateScope = element.isolateScope();
  }));

  it('should be defined', function test() {
    expect(isolateScope).toBeDefined();
    expect(isolateScope.pageLoading).toBeTruthy();
    expect(isolateScope.pageLoadedSuccess).toBeFalsy();
  });

  it('should change view when `$stateChangeStart` is fired', function test() {
    $rootScope.$broadcast('$stateChangeStart');
    expect(isolateScope.pageLoading).toBeTruthy();
    expect(isolateScope.pageLoadedSuccess).toBeFalsy();
  });

  it('should change view when `$stateChangeSuccess` is fired', function test() {
    $rootScope.$broadcast('$stateChangeSuccess');
    expect(isolateScope.pageLoading).toBeFalsy();
    expect(isolateScope.pageLoadedSuccess).toBeTruthy();
  });

  it('should not change view when `$stateChangeError` is fired', function test() {
    $rootScope.$broadcast('$stateChangeError');
    expect(isolateScope.pageLoading).toBeTruthy();
    expect(isolateScope.pageLoadedSuccess).toBeFalsy();
  });
});
