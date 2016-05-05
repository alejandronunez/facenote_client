'use strict';

describe('Controller: ProfileFormCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('facenoteApp'));

  var ProfileFormCtrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfileFormCtrlCtrl = $controller('ProfileFormCtrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProfileFormCtrlCtrl.awesomeThings.length).toBe(3);
  });
});
