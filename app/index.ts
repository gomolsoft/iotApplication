/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />

/// <reference path="conf/conf.controller.ts" />
/// <reference path="conf/sensorconf.controller.ts" />
/// <reference path="conf/controller/logic.conf.ctrl.ts" />
/// <reference path="conf/controller/bind.conf.ctrl.ts" />

/// <reference path="service/component.handler.ts" />
/// <reference path="service/component.service.ts" />
/// <reference path="service/location.service.ts" />

/// <reference path="components/navbar/navbar.controller.ts" />
/// <reference path="conf/controller/main.conf.ctrl.ts" />


interface ILocation {
    locationName: string
    serialNos: string[]
}

interface IComponent {
    name: string
    serialNo: string
    configMode: string
    sensors: IotInterface[]
    actors: IotInterface[]
    internetDatas: IotInterface[]

    //per late Binding
    room: string
}

interface IotInterface {
    name: string
    properties: IProperty[]

}

interface IProperty {
    name: string // NUMERIC, SEQUENCE, STRING, BOOLEAN

}

interface ILogicBrick {
    input: ICondition;
    output: IActivation;

}

interface ICondition {
    component: IComponent
    iotInterface: IotInterface

    conditionValue: any;
    condition: string ;

}

interface IActivation {
    component: IComponent
    iotInterface: IotInterface

    conditionValue: any;
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
        'ui.bootstrap',
        'mgcrea.ngStrap',
        'ngDragDrop',
        'xeditable'])

        .run(function (editableOptions) {
            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        })

        //Service
        .service('ComponentService', ComponentService)
        .service('ComponentHandler', ComponentHandler)
        .service('LocationService', LocationService)

        //Controller
      .controller('MainCtrl', MainCtrl)
      .controller('NavbarCtrl', NavbarCtrl)
      .controller('ConfCtrl', ConfCtrl)
        .controller('SensorConfCtrl', SensorConfCtrl)
        .controller('MainConfCtrl', MainConfCtrl)
        .controller('LogicConfCtrl', LogicConfCtrl)
        .controller('LogicBindConfCtrl', LogicBindConfCtrl)

        //Configuration
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

//Configuration-App
        .state("conf", {
            controller: 'MainConfCtrl',
            abtract: false,
            url: '/myConfig',
                    templateUrl: 'app/conf/html/main.conf.html'
        })

        .state("conf.sensor", {
            url: "/sensor",
                    templateUrl: 'app/conf/html/conf.sensor.html'
        })

        .state("conf.aktor", {
            url: "/aktor",
                    templateUrl: 'app/conf/html/conf.aktor.html'
        })

                .state("conf.logic", {
                    url: '/logic/:iotId',
                    templateUrl: 'app/conf/html/conf.logic.html',
                    controller: 'LogicConfCtrl'
                })

                .state("conf.logic.bind", {
                    url: '/:sensorName',
                    templateUrl: 'app/conf/html/conf.logic.bind.html',
                    controller: 'LogicConfCtrl'
                })

                .state("conf.logic.bind.action", {
                    url: '/:aktorIoT',
                    templateUrl: 'app/conf/html/conf.logic.action.html',
            controller: 'LogicBindConfCtrl'
                })

// old
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
            controller: 'ConfCtrl'
            //controller: 'SensorConfCtrl'

        })

    ;

            $urlRouterProvider
                // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                // Here we are just setting up some convenience urls.
                .when('/l/:iotId', '/logic/:iotId')

                .otherwise('/')

        })
;
}
