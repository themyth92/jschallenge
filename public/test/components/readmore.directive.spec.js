'use strict';
describe('[ Unit components/readmore ]', function desc() {
  var scope;
  var isolateScope;
  var element;
  var $compile;

  beforeEach(function beforeEach() {
    module('test.template');
    module('components.readmore');
  });

  beforeEach(inject(function inject(_$compile_, _$rootScope_) {
    var $rootScope = _$rootScope_;

    $compile = _$compile_;
    scope = $rootScope.$new();
    element = $compile('<readmore></readmore>')(scope);
    scope.$digest();
    isolateScope = element.isolateScope();
  }));

  describe('{ Init directive }', function desc() {
    it('should set correct default scope value when no attrs is given to directive', function test() {
      element = $compile('<readmore></readmore>')(scope);
      scope.$digest();
      isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
      expect(isolateScope.limit).toBe(50);
      expect(isolateScope.moreText).toBe('Read more');
      expect(isolateScope.lessText).toBe('Less');
      expect(isolateScope.fullText).toBeFalsy();
    });

    it('should set correct scope value when attrs is given to directive', function test() {
      element = $compile('<readmore limit="40" more-text="More" less-text="Drop"></readmore>')(scope);
      scope.$digest();
      isolateScope = element.isolateScope();
      expect(isolateScope).toBeDefined();
      expect(isolateScope.limit).toBe('40');
      expect(isolateScope.moreText).toBe('More');
      expect(isolateScope.lessText).toBe('Drop');
      expect(isolateScope.fullText).toBeFalsy();
    });
  });

  describe('{ method:toggle }', function desc() {
    it('should reverse `fullText` when `toggle` is executed', function test(){
      var reverse = !isolateScope.fullText;

      isolateScope.toggle();
      expect(isolateScope.fullText).toBe(reverse);
    });
  });
}); 
