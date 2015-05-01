/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    interface ISensorConfScope extends ng.IScope {
        onDrop: Function;

        dropElem: IComponent
        init(): void
    }

    export class SensorConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', 'Restangular', 'dropService'];

        scope:ISensorConfScope;
        myService:restangular.IService;
        dropService:DropService;

        constructor($scope:ISensorConfScope, myService:restangular.IService, dropService:DropService) {
            this.scope = $scope;
            this.myService = myService;
            this.dropService = dropService;

            $scope.dropElem = dropService.getSensor();

            $scope.init = () => this.init();
            $scope.onDrop = () => this.myOnDrop();

            console.log('constructor (SensorConfCtrl)');
        }

        private init() {
            console.log('init (SensorConfCtrl)');
        }

        private confModeEnabled():boolean {
            var hit = false;
            this.dropService.getSensor();

            return true;
        }

        private myOnDrop() {
            console.log(this.scope.dropElem.serialNo);
            this.dropService.onSensorDrop(this.scope.dropElem);

            this.scope.$apply();
        }

    }
}
