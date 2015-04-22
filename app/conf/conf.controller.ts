/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    //import IService = restangular.IService;

    interface IDragElement {
        title: string;
    }

    interface IConfScope extends ng.IScope {
        date: Date
        dragElem: IDragElement
        dropElem: IDragElement
        dropSignal: string

        onOver: Function
        onOut: Function
        onDrop: Function
        startCallback: Function
        stopCallback: Function

        deviceList: Array<any>
    }

    export class ConfCtrl {
        /* @ngInject */

        static $inject = ["$scope", "Restangular"];

        constructor($scope:IConfScope, myService:restangular.IService) {
            var list = myService.allUrl('googlers', 'http://www.google.com/').getList();
            //console.log($scope.deviceList);
            console.log(list);

            //var serv = restangular.IService;
            // restService.all('device/devices').getList().then(function(components){
            //    $scope.deviceList = components;
            // });

            $scope.date = new Date();

            $scope.dragElem = {title: 'Sandro'};
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
                $scope.dragElem = null;
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
                // $scope.dragElement = null;
                $scope.$apply();
            };

        }
    }

}
