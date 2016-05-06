'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:LeftSideCtrl
 * @description
 * # LeftSideCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('LeftSideCtrl', function ($scope,$rootScope,FriendService,$state,$stateParams) {
    var id = undefined;
    if($stateParams.id != undefined){
      id = $stateParams.id;
    }
    FriendService.of(id).then(function(result){
      $scope.friends_of = result.data
    });
    FriendService.all().then(function(result){
      $scope.all_friends = JSON.parse(result.data.all_friends);
      $scope.not_friends = [];
      $scope.current_profile = result.data.current_profile;
      var not_friends = JSON.parse(result.data.not_friends);
      for (var l in not_friends){
        var findout = false;
        for (var i in $scope.all_friends){
          if($scope.all_friends[i].profile1.id == not_friends[l].id){
            findout = true;
            break;
          }
        }
        if(!findout){
          $scope.not_friends.push(not_friends[l])
        }
      }
    });
    $scope.remove_friend = function(id){
      FriendService.remove_friend(id).then(function(){
        var temp = [];
        for (var i in $scope.all_friends){
          if($scope.all_friends[i].id != id){
            temp.push($scope.all_friends[i]);
          }else{
            $scope.not_friends.push($scope.all_friends[i].profile1);
            if($scope.all_friends[i].state == 1){
              $rootScope.$emit('update_friendship');
            }
          }
        }
        $scope.all_friends = temp;
      });
    };
    $scope.send_request = function(id){
      FriendService.send_request(id).then(function(data){
        var temp = [];
        for (var i in $scope.not_friends){
          if($scope.not_friends[i].id != id){
            temp.push($scope.not_friends[i]);
          }else{
            var friend = {
              profile1:$scope.not_friends[i],
              state:0,
              id:data.data.id
            };
            friend.profile1.action = undefined;
            $scope.all_friends.push(friend)
          }
        }
        $scope.not_friends = temp;
      });
    };
    $scope.accept_friend = function(id){
      FriendService.accept_friend(id).then(function(data){
        var temp = [];
        for (var i in $scope.all_friends){
          if($scope.all_friends[i].id != id){
            temp.push($scope.all_friends[i]);
          }
        }
        $scope.all_friends = temp;
        $scope.all_friends.push(data.data);
        $rootScope.$emit('update_friendship');
      });
    };
  });
