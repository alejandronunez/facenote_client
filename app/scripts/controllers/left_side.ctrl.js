'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:LeftSideCtrl
 * @description
 * # LeftSideCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('LeftSideCtrl', function ($scope,FriendService,$state,$stateParams) {
    var id = undefined;
    if($stateParams.id != undefined){
      id = $stateParams.id;
    }
    FriendService.all(id).then(function(result){
      $scope.friends = result.data
    });
  });
