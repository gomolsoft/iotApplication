/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="../app/conf/conf.controller.ts" />
/// <reference path="../app/conf/sensorconf.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />
/// <reference path="../app/conf/DropService.ts" />

interface IComponent {
    name: string
    serialNo: string
    configured: boolean
    configMode: string
    sensors: ISensors[]
}

interface ISensors {
    name: string
    sensorType: string
    properties: IPropertie[]
}

interface IPropertie {
    name: string

    rangeFrom: number
    rangeTo: number
    unityName: string

}


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

        .service('dropService', DropService)

      .controller('MainCtrl', MainCtrl)
      .controller('NavbarCtrl', NavbarCtrl)
      .controller('ConfCtrl', ConfCtrl)
        .controller('SensorConfCtrl', SensorConfCtrl)

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
            controller: 'ConfCtrl',
            abstract: false,
            /* onEnter: function () {
                console.log("OnEnter: contacts");
             }*/
        })

        .state('config.edit', {
            url: '/:serialNo',
            templateUrl: 'app/conf/componentEdit.html',
            controller: 'SensorConfCtrl'

        })

    ;

    $urlRouterProvider.otherwise('/');

        })
;
}
