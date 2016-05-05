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
      all:function(id){
        var url = $rootScope.server_url+'/friends_of';
        if(id != undefined){
          url = url + '/' + id + '.json';
        }else{
          //url = url + '.json';
          url = url + '/50.json';
        }
        return $http.get(url)
      }
    }
  });
