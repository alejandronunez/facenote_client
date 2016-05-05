'use strict';

/**
 * @ngdoc service
 * @name facenoteApp.ProfileService
 * @description
 * # profile.service
 * Service in the facenoteApp.
 */
angular.module('facenoteApp')
  .service('ProfileService', function ($http,$rootScope) {
    return {
      save:function(data){
        console.log(data);
        return $http.put($rootScope.server_url+'/profiles/'+data.id +'.json',data)
      }
    }
  });
