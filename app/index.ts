/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="../app/conf/conf.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />


module app {
  'use strict';

  angular.module('app', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'mgcrea.ngStrap', 'ngDragDrop'])
      .controller('MainCtrl', MainCtrl)
      .controller('NavbarCtrl', NavbarCtrl)
      .controller('ConfCtrl', ConfCtrl)
      .config(['RestangularProvider', (RestangularProvider:restangular.IProvider) => {
          RestangularProvider.setBaseUrl('http://localhost:8080');
      }])

      .config(function
          ($stateProvider:ng.ui.IStateProvider,
           $urlRouterProvider:ng.ui.IUrlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
            /*            ,
             resolve: {
             myService: ['Restangular', (restService: restangular.IService) => {
             return restangular.IService;
             }]
             }
             */
        })

        .state('config', {
            url: '/config',
            templateUrl: 'app/conf/conf.html',
            controller: 'ConfCtrl'
        })
    ;

    $urlRouterProvider.otherwise('/');
  })
;
}
