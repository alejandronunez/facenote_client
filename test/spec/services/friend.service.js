'use strict';

describe('Service: friend.service', function () {

  // load the service's module
  beforeEach(module('facenoteApp'));

  // instantiate service
  var friend.service;
  beforeEach(inject(function (_friend.service_) {
    friend.service = _friend.service_;
  }));

  it('should do something', function () {
    expect(!!friend.service).toBe(true);
  });

});
