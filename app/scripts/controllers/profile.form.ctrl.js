'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:ProfileFormCtrl
 * @description
 * # ProfileFormCtrlCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('ProfileFormCtrl', function ($scope,$rootScope,$mdDialog,ProfileService,$mdToast) {
    $scope.cancel = function(){
      $mdDialog.cancel();
    };
    $scope.profile_editing = $rootScope.profile_editing;
    $scope.save = function(){
      ProfileService.save($scope.profile_editing).then(function(){
        $mdDialog.cancel();
        $mdToast.show(
          $mdToast.simple()
            .textContent('The profile has been saved')
            .hideDelay(3000)
        );
      });
    }
  });
