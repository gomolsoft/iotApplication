/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    //import IService = restangular.IService;


    interface IConfScope extends ng.IScope {
        dropElem: IComponent

        onDrop: Function
        doTask(c:IComponent): void
        isConfModeEnabled(): boolean

        deviceList: IComponent[]

        componentListViewMode: string
        componentListView: string
        init(): void
    }

    export class ConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', 'Restangular', 'dropService'];

        scope:IConfScope;
        myService:restangular.IService;
        dropService:DropService;

        constructor($scope:IConfScope, myService:restangular.IService, dropService:DropService) {
            this.scope = $scope;
            this.myService = myService;
            this.dropService = dropService;

            $scope.componentListViewMode = 'S';
            $scope.componentListView = 'Sensoren';

            $scope.dropElem = dropService.getSensor();

            $scope.onDrop = () => this.myOnDrop();
            $scope.init = () => this.init();
            $scope.doTask = (c:IComponent) => this.doTask(c);

            this.loadListElem();

            $scope.isConfModeEnabled = () => this.confModeEnabled();

        }

        private init() {
            this.myService.one('device/reinit').get().then(
                (components:IComponent[]) => {
                    this.scope.deviceList = components;
                });
            this.dropService.setSensor(null);
            console.log('init (ConfCtrl)');
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
            this.dropService.setSensor(this.scope.dropElem);
            this.myService
                .one('device', this.scope.dropElem.serialNo)
                .post('basicRegister')
                .then(
                (components:IComponent[]) => {
                    this.scope.deviceList = components;
                }
            );

            this.scope.componentListView = 'Aktuatoren';
            this.scope.componentListViewMode = 'A';

            //window.location.href = "#/config/" + this.scope.dropElem.serialNo;

            this.scope.$apply();
        }
    }
}
