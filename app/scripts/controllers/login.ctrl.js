'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:LoginCtrl
 * @description
 * # LoginCtrlCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('LoginCtrl', function ($scope,$state,WallService,$http,$cookies,$auth,$mdToast) {
    $scope.user = {
      email:'alejo@cubanwebprofessionals.com',
      password:'Ale880514',
      action:false,
      password_confirmation:''
    };
    $scope.login = function(){
      if(!$scope.user.action){
        $auth.submitLogin($scope.user)
          .then(function(resp) {
            $state.go('home');
          })
          .catch(function(resp) {});
      }else{
        $auth.submitRegistration($scope.user)
          .then(function(resp) {
            $state.go('home');
          })
          .catch(function(resp) {
            for (var i in resp.data.errors.full_messages){
              (function(arg){
                setTimeout(function(){
                  $mdToast.show(
                    $mdToast.simple()
                      .textContent(resp.data.errors.full_messages[arg])
                      .hideDelay(3000)
                  );
                },arg*1000)
              })(i);
            }
          });
      }
    };
  });
