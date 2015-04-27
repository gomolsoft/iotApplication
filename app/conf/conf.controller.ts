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

        onDrop: Function

        deviceList: Array<IComponent>[]
    }

    export class ConfCtrl {
        /* @ngInject */
        static $inject = ["$scope", "Restangular"];

        scope:IConfScope;
        myService:restangular.IService;

        constructor($scope:IConfScope, myService:restangular.IService) {
            this.scope = $scope;
            this.myService = myService;

            $scope.dropElem = null;

            var basedevices = myService.all('device/devices');

            basedevices
                .getList()
                .then((components:Array<IComponent>[]) => {
                    $scope.deviceList = components;
                });

            $scope.onDrop = () => this.myOnDrop();

        }

        private myOnDrop() {
            console.log('(inside)onDrop');
            this.scope.dropSignal = 'alert ';
            console.log(this.scope.dropElem.serialNo);

            this.myService
                .one('device', this.scope.dropElem.serialNo)
                .post('basicRegister', this.scope.dropElem)
                .then((components:Array<IComponent>[]) => {
                    this.scope.deviceList = components;
                });

            this.scope.$apply();


        }
    }

}
