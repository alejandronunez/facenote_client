'use strict';

/**
 * @ngdoc service
 * @name facenoteApp.services.wall
 * @description
 * # WallService
 * Service in the facenoteApp.
 */
angular.module('facenoteApp')
  .service('WallService', function ($http,$rootScope) {
    return {
      post_of_profile:function(id){
        var url = $rootScope.server_url+'/profile';
        if(id != undefined){
          url = url + '/' + id + '.json';
        }else{
          //url = url + '.json';
          url = url + '.json';
        }
        return $http.get(url);
      },
      save_post:function(data){
        return $http.post($rootScope.server_url+'/posts.json',data)
      },
      save_comment:function(data){
        return $http.post($rootScope.server_url+'/comments.json',data)
      },
      like:function(id){
        return $http.post($rootScope.server_url+'/profile/'+id+'/like.json',{})
      }
    }
  });
