/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    interface ISensorConfScope extends ng.IScope {
        onDrop: Function;

        dropActuator: IComponent
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

            //$scope.dropElem = componentHandler.getSensorComponent();


            $scope.onDrop = (a:any, b:any, sensor:IotInterface) => this.myOnDrop(sensor);
        }

        private myOnDrop(sensor:IotInterface) {
            console.log("Aktor:" + this.scope.dropActuator.serialNo);
            console.log("Sensor:" + sensor.name);

            this.componentHandler.onActorDrop(this.scope.dropActuator);

            this.scope.$apply();
        }


    }
}
