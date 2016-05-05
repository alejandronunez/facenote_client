'use strict';

/**
 * @ngdoc service
 * @name facenoteApp.services.wall
 * @description
 * # WallService
 * Service in the facenoteApp.
 */
angular.module('facenoteApp')
  .service('WallService', function ($http,CONFIG) {
    return {
      post_of_profile:function(id){
        var url = CONFIG.url+':'+CONFIG.port+'/profile';
        if(id != undefined){
          url = url + '/' + id + '.json';
        }else{
          //url = url + '.json';
          url = url + '.json';
        }
        return $http.get(url);
      }
    }
  });
