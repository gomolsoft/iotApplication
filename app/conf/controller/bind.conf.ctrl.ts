/**
 * Created by Sandro on 05.05.15.
 */

/// <reference path="../../index.ts" />

module app {
    'use strict';

    interface ILogicConfParam extends ng.ui.IStateParamsService {
        iotId: string
        sensorName: string
        aktorIoT: string

    }

    interface ILogicConfScope extends ng.IScope {
        sensorName:IotInterface

        sensorIot: IComponent
        actorIot: IComponent

        activation: IActivation
        condition: ICondition
    }

    class Condition implements ICondition {
        component:IComponent;
        iotInterface:IotInterface;

        conditionValue:any;
        condition:string;

        public getConditions() {
            //TODO:component
        }

        constructor(component:IComponent) {
            this.component = component
        }
    }

    class Activation implements IActivation {
        component:IComponent;
        iotInterface:IotInterface;

        conditionValue:any;

        constructor(component:IComponent) {
            this.component = component
        }
    }

    export class LogicBindConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', '$state', '$stateParams', 'ComponentService'];

        scope:ILogicConfScope;
        state:angular.ui.IStateService;
        componentService:ComponentService;

        constructor($scope:ILogicConfScope, $state:ng.ui.IStateService, $stateParams:ILogicConfParam, componentService:ComponentService) {
            this.scope = $scope;
            this.state = $state;

            this.scope.activation;

            this.scope.sensorName.name = $stateParams.sensorName;
            this.componentService = componentService;

            componentService
                .loadComponentBySerialNo(
                $stateParams.iotId, (
                    (c:IComponent)=> {
                        this.scope.sensorIot = c;
                        this.scope.activation = new Activation(c);
                    } ));

            componentService
                .loadComponentBySerialNo(
                $stateParams.aktorIoT, (
                    (c:IComponent)=> {
                        this.scope.actorIot = c;
                        this.scope.activation = new Activation(c);
                    } ))
        }
    }
}
