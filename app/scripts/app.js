'use strict';

/**
 * @ngdoc overview
 * @name facenoteApp
 * @description
 * # facenoteApp
 *
 * Main module of the application.
 */
angular
  .module('facenoteApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'ui.router',
    'ng-token-auth',
    'ngFileUpload'
  ])
  .constant("CONFIG",{
    url: "https://facenote.herokuapp.com",
    port: "443"
  })
  //.constant("CONFIG",{
  //  url: "http://192.168.75.128",
  //  port: "3000"
  //})
  .constant('IS_AUTH',function($auth){
    return $auth.validateUser();
  })
  .config(function ($stateProvider, $urlRouterProvider,IS_AUTH,$authProvider,CONFIG,$locationProvider) {
    $urlRouterProvider.otherwise("/home");
    $stateProvider
      .state('home', {
        url: "/home",
        views:{
          left_side:{
            templateUrl: "views/elements/nav_bar.html",
            controller: "LeftSideCtrl"
          },
          mainContent:{
            templateUrl: "views/wall.html",
            controller: "WallCtrl"
          }
        },
        resolve:{
          isAuthenticate:IS_AUTH
        }
      })
      .state('profile', {
        url: "/profile/:id",
        views:{
          left_side:{
            templateUrl: "views/elements/nav_bar.html",
            controller: "LeftSideCtrl"
          },
          mainContent:{
            templateUrl: "views/wall.html",
            controller: "WallCtrl"
          }
        },
        resolve:{
          isAuthenticate:IS_AUTH
        }
      })
      .state('login',{
        url: "/landing",
        views:{
          left_side:{
            templateUrl: "views/elements/login.html",
            controller: "LoginCtrl"
          },
          mainContent:{
            templateUrl: "views/landing.html"
          }
        }
      });
    $authProvider.configure({
      apiUrl: CONFIG.url+':'+CONFIG.port
    });
    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope,CONFIG,$state){
    $rootScope.server_url = CONFIG.url+':'+CONFIG.port;
    $rootScope.$on('$stateChangeError', function(){
      $state.go("login");
    });
  });
