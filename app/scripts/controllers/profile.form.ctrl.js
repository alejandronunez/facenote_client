'use strict';

/**
 * @ngdoc function
 * @name facenoteApp.controller:ProfileFormCtrl
 * @description
 * # ProfileFormCtrlCtrl
 * Controller of the facenoteApp
 */
angular.module('facenoteApp')
  .controller('ProfileFormCtrl', function ($scope,$rootScope,$mdDialog,ProfileService,$mdToast,Upload) {
    $scope.cancel = function(){
      $mdDialog.cancel();
    };
    $scope.profile_editing = $rootScope.profile_editing;
    $scope.save = function(){
      $scope.profile_editing.image = undefined;
      ProfileService.save({
        id: $scope.profile_editing.id,
        firstname: $scope.profile_editing.firstname,
        surname: $scope.profile_editing.surname,
        image_id: $scope.profile_editing.image_id
      }).then(function(){
        $mdDialog.cancel();
        $mdToast.show(
          $mdToast.simple()
            .textContent('The profile has been saved')
            .hideDelay(3000)
        );
      });
    };
    if($rootScope.profile_editing.image == undefined){
      $scope.uploaded = 'images/yeoman.png';
    }else{
      $scope.uploaded = $rootScope.server_url+$rootScope.profile_editing.image.content_url;
    }
    $scope.upload = function (file) {
      Upload.upload({
        url: $rootScope.server_url+'/images.json',
        method: 'POST',
        data: {name:'tester'},//it is the data that's need to be sent along with image
        file: file,
        fileFormDataName: 'image[image]',//myEntity is the name of the entity in which image is saved and image is the name of the attachment
        formDataAppender: function(fd, key, val) {
          if (angular.isArray(val)) {
            angular.forEach(val, function(v) {
              fd.append('image['+key+']', v);
            });
          } else {
            fd.append('image['+key+']', val);
          }
        }
      }).then(function (resp) {
        $scope.uploaded = $rootScope.server_url + resp.data.content_url;
        $scope.profile_editing.image_id = resp.data.id;
        $rootScope.profile_editing.image = resp.data;
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $scope.progressPercentage = progressPercentage;
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };
  });
