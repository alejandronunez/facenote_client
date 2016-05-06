'use strict';

/**
 * @ngdoc service
 * @name facenoteApp.service.friend
 * @description
 * # Friend.Service
 * Service in the facenoteApp.
 */
angular.module('facenoteApp')
  .service('FriendService', function ($http,$rootScope) {
    return {
      of:function(id){
        var url = $rootScope.server_url+'/friends_of';
        if(id != undefined){
          url = url + '/' + id + '.json';
        }else{
          url = url + '.json';
        }
        return $http.get(url)
      },
      all:function(){
        var url = $rootScope.server_url+'/friendships.json';
        return $http.get(url)
      },
      remove_friend:function(id){
        var url = $rootScope.server_url+'/friendships/'+id+'/remove_friend.json';
        return $http.post(url,{})
      },
      send_request:function(id){
        var url = $rootScope.server_url+'/friendships/'+id+'/send_request.json';
        return $http.post(url,{})
      },
      accept_friend:function(id){
        var url = $rootScope.server_url+'/friendships/'+id+'/accept.json';
        return $http.post(url,{})
      }
    }
  });
