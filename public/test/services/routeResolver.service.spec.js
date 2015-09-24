'use strict';
describe('[ Unit services/routeResolver.service ]', function desc() {
  var $httpBackend;
  var routeResolver;
  var appData;

  // mock data
  var data = {

    // carPark list from server
    carParkArr : [{
      id : '1',
      cars_available : '1',
      parking_shortname : 'Shortname 1',
      description : 'Desc 1',
      latitude : '0',
      longitude : '1'
    }, {
      id : '2',
      cars_available : '1',
      parking_shortname : 'Shortname 2',
      description : 'Desc 2',
      latitude : '0',
      longitude : '1'
    }]
  };

  beforeEach(function beforeEach() {
    module('services.routeResolver');
    module('mock.services.appData');
  });

  beforeEach(inject(function inject(_$httpBackend_, _routeResolver_, _appData_) {
    $httpBackend = _$httpBackend_;
    routeResolver = _routeResolver_;
    appData = _appData_;
    
    // always return 200
    $httpBackend.when('GET', '/api/v1/carparks')
                .respond(data.carParkArr);
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should be defined', function test() {
    expect(routeResolver).toBeDefined();
  });

  it('should resolve base route correctly', function test() {
    $httpBackend.expectGET('/api/v1/carparks');
    routeResolver.baseRoute().then(function then() {
      expect(appData.data.appLoaded).toBeTruthy();
      expect(appData.processCarParkArr).toHaveBeenCalledWith(data.carParkArr);  
    });

    $httpBackend.flush();
  });
});
