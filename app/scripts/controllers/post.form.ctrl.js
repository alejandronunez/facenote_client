'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:PostFormCtrl
 * @description
 * # PostFormCtrlCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('PostFormCtrl', function ($scope,$rootScope,$mdDialog,WallService,$mdToast) {
    $scope.cancel = function(){
      $mdDialog.cancel();
    };
    $scope.save = function(){
     WallService.save_post($scope.post).then(function(resp){
       $rootScope.$emit('new_post',resp.data);
        $mdDialog.cancel();
        $mdToast.show(
          $mdToast.simple()
            .textContent('The Post has been saved')
            .hideDelay(3000)
        );
      });
    };
  });
