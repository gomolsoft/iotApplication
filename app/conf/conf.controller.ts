/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    //import IService = restangular.IService;

    interface IComponent {
        name: string
        serialNo: string
        configured: boolean
        configMode: string
    }

    interface IConfScope extends ng.IScope {
        dropElem: IComponent
        dropSignal: string

        onOver: Function
        onOut: Function
        onDrop: Function
        startCallback: Function
        stopCallback: Function

        deviceList: Array<IComponent>[]
    }

    export class ConfCtrl {
        /* @ngInject */
        static $inject = ["$scope", "Restangular"];

        constructor($scope:IConfScope, myService:restangular.IService) {
            var basedevices = myService.all('device/devices');

            basedevices
                .getList()
                .then((components:Array<IComponent>[]) => {
                    $scope.deviceList = components;
                });


            $scope.dropElem = null;


            $scope.onOver = function (/* event, ui */) {
                console.log('onOver');
                $scope.dropSignal = 'alert alert-success show';

                $scope.$apply();
            };

            $scope.onOut = function (/* event, ui */) {
                console.log('onOut');
                $scope.dropSignal = 'alert alert-warning show';

                $scope.$apply();
            };

            $scope.onDrop = function (/* event, ui */) {
                console.log('onDrop');
                $scope.dropSignal = 'alert ';
                console.log($scope.dropElem.serialNo);

                myService
                    .one('device', $scope.dropElem.serialNo)
                    .post('basicRegister', $scope.dropElem)
                    .then((components:Array<IComponent>[]) => {
                        $scope.deviceList = components;
                    });

                $scope.$apply();
            };

            $scope.startCallback = function (event, ui, dragElem) {
                console.log('Start dragging: ', dragElem.name);
                $scope.dropSignal = 'alert alert-warning show';

                $scope.$apply();
            };

            $scope.stopCallback = function (event, ui, dragElem) {
                console.log('Stop dragging: ', dragElem.name);
                $scope.dropSignal = 'alert alert-info ';

                $scope.$apply();
            };

        }
    }

}
