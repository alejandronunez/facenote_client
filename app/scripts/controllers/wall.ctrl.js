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
    function update_Data(){
        WallService.post_of_profile(id).then(function(result){
            $scope.posts = JSON.parse(result.data.posts);
            $scope.profile = JSON.parse(result.data.profile);
            $scope.owner = result.data.owner;
        });
    }
    update_Data();
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
    };
    $scope.new_post = function(ev){
      $mdDialog.show({
          controller: 'PostFormCtrl',
          templateUrl: 'views/elements/post.form.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.add_comments = function(post_id,ev){
      $rootScope.post_to_add_comment = post_id;
      $mdDialog.show({
          controller: 'CommentFormCtrl',
          templateUrl: 'views/elements/comment.form.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.like = function(post,ev){
      WallService.like(post.id).then(function(resp){
        post.likers_count = resp.data;
      });
    };
    $rootScope.$on('update_friendship',function(){
      if($scope.owner){
        update_Data();
      }
    });
    $rootScope.$on('new_post',function(e,post){
      var temp = [post].concat($scope.posts);
      $scope.posts = temp;
    });
    $rootScope.$on('new_comment',function(e,comment){
      for (var i in $scope.posts){
        if($scope.posts[i].id == comment.post_id){
          var temp = [comment].concat($scope.posts[i].comments);
          $scope.posts[i].comments = temp;
          break;
        }
      }
      console.log(comment);
    });
  });
