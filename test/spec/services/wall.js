'use strict';

describe('Service: wall', function () {

  // load the service's module
  beforeEach(module('facenoteApp'));

  // instantiate service
  var wall;
  beforeEach(inject(function (_wall_) {
    wall = _wall_;
  }));

  it('should do something', function () {
    expect(!!wall).toBe(true);
  });

});
