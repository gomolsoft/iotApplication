/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    interface ISensorConfScope extends ng.IScope {
        onDrop: Function;

        dropElem: IComponent
    }

    export class SensorConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', 'ComponentHandler'];

        scope:ISensorConfScope;
        myService:restangular.IService;
        componentHandler:ComponentHandler;

        updateListTask:Function;

        constructor($scope:ISensorConfScope, componentHandler:ComponentHandler) {
            this.scope = $scope;
            this.componentHandler = componentHandler;

            $scope.dropElem = componentHandler.getSensorComponent();

            $scope.onDrop = () => this.myOnDrop();
        }

        private myOnDrop() {
            console.log(this.scope.dropElem.serialNo);
            this.componentHandler.onSensorDrop(this.scope.dropElem);

            this.scope.$apply();
        }


    }
}
