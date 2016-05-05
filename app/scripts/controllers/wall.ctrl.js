'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:WallCtrl
 * @description
 * # WallCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('WallCtrl', function ($rootScope,$scope,WallService,$stateParams,$auth,$state,$mdDialog) {
    var id = undefined;
    if($stateParams.id != undefined){
      id = $stateParams.id;
    }
    WallService.post_of_profile(id).then(function(result){
      $scope.posts = JSON.parse(result.data.posts);
      $scope.profile = JSON.parse(result.data.profile);
    });
    $scope.sign_out = function(){
      $auth.signOut()
        .then(function(resp) {
          $state.go('login');
        })
        .catch(function(resp) {});
    };
    $scope.edit = function(profile,ev){
      $rootScope.profile_editing = profile;
      $mdDialog.show({
          controller: 'ProfileFormCtrl',
          templateUrl: 'views/elements/profile.form.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    }
  });
