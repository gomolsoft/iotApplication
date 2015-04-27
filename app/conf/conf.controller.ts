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
        doTask(c:IComponent): void;
        isConfModeEnabled(): boolean;

        deviceList: IComponent[]
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

            $scope.onDrop = () => this.myOnDrop();
            $scope.doTask = (c:IComponent) => this.doTask(c);

            this.loadListElem();

            $scope.isConfModeEnabled = () => this.confModeEnabled();
        }

        private  loadListElem() {
            var basedevices = this.myService.all('device/devices');

            basedevices
                .getList()
                .then((components:IComponent[]) => {
                    this.scope.deviceList = components;
                });
        }

        private doTask(c:IComponent) {
            console.log(c);
        }

        private confModeEnabled():boolean {
            var hit = false;

            if (this.scope.deviceList == undefined) return hit;

            this.scope.deviceList.forEach(c => {
                    if (c.configMode == 'CONFIGURING') {
                        hit = true;
                        return true;
                    }
                }
            );
            return hit;
        }

        private myOnDrop() {
            console.log(this.scope.dropElem.serialNo);
            this.scope.dropSignal = 'alert ';

            this.myService
                .one('device', this.scope.dropElem.serialNo)
                .post('basicRegister', this.scope.dropElem)
                .then(
                (components:IComponent[]) => {
                    this.scope.deviceList = components;
                }
            );

            this.scope.$apply();
        }
    }

}
