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

    }

    interface IDragElement {
        title: string;
    }

    interface IConfScope extends ng.IScope {
        dragElem: IComponent
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

            basedevices.getList()
                .then((components:Array<IComponent>[]) => {
                    $scope.deviceList = components;
                    console.log("load");
                });


            $scope.dragElem = null; //{title: 'Sandro'};
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
                $scope.dropElem = $scope.dragElem;
                // $scope.dragElem = null;
                console.log($scope.dropElem.name);

                var length = $scope.deviceList.length; // indexOf($scope.dropElem);

                var elem = $scope.dragElem;

                var idx = $scope.deviceList.forEach;

                $scope.$apply();
            };

            $scope.startCallback = function (event, ui, dragElem) {
                console.log('You started dragging: ', dragElem.name);
                $scope.dropSignal = 'alert alert-warning show';
                $scope.dragElem = dragElem;

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
