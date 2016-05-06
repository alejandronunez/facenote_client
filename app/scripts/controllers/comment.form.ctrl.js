'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:CommentFormCtrl
 * @description
 * # CommentFormCtrlCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('CommentFormCtrl', function ($scope,$rootScope,$mdDialog,WallService,$mdToast) {
    $scope.cancel = function(){
      $mdDialog.cancel();
    };
    $scope.comment = {
      post_id:$rootScope.post_to_add_comment
    };
    $scope.save = function(){
     WallService.save_comment($scope.comment).then(function(resp){
       $rootScope.$emit('new_comment',resp.data);
        $mdDialog.cancel();
        $mdToast.show(
          $mdToast.simple()
            .textContent('The Comment has been saved')
            .hideDelay(3000)
        );
      });
    };
  });
