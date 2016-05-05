'use strict';

describe('Service: profile.service', function () {

  // load the service's module
  beforeEach(module('facenoteApp'));

  // instantiate service
  var profile.service;
  beforeEach(inject(function (_profile.service_) {
    profile.service = _profile.service_;
  }));

  it('should do something', function () {
    expect(!!profile.service).toBe(true);
  });

});
