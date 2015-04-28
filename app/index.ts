/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="../app/conf/conf.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />


module app {
  'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'restangular',
        'ui.router',
        'mgcrea.ngStrap',
        'ngDragDrop',
        'xeditable'])

        .run(function (editableOptions) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        })

      .controller('MainCtrl', MainCtrl)
      .controller('NavbarCtrl', NavbarCtrl)
      .controller('ConfCtrl', ConfCtrl)

        .config(['RestangularProvider',
            (RestangularProvider:restangular.IProvider) => {
                RestangularProvider.setBaseUrl('http://192.168.0.13:8080');
            }
        ])

      .config(function
            ($stateProvider:ng.ui.IStateProvider,
             $urlRouterProvider:ng.ui.IUrlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'

        })

        .state('config', {
            url: '/config',
            templateUrl: 'app/conf/conf.html',
            controller: 'ConfCtrl'
        })

        .state('config.edit', {
            url: '/:serialNo',
            templateUrl: 'app/conf/componentEdit.html',
            controller: 'ConfCtrl'
        })

    ;

    $urlRouterProvider.otherwise('/');

        })
;
}
