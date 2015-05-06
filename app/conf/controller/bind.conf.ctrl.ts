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
        sensorName:string

        sensorIot: IComponent
        actorIot: IComponent

        activation: IActivation
        condition: ICondition
    }

    class KeyPair {
        constructor(private key:string, display:string) {

        }
    }

    class Condition implements ICondition {
        component:IComponent;
        iotInterface:IotInterface;

        conditionValue:any;
        condition:string;

        valueProp:IProperty;

        public getConditions():KeyPair[] {
            var conditions:KeyPair[];
            conditions = [];

            if (this.valueProp.valuePropertyType == 'NUMERIC') {
                conditions.push(new KeyPair('Gleich', 'EQ'));
                conditions.push(new KeyPair('Größer', 'GT'));
                conditions.push(new KeyPair('Größer oder gleich', 'TE'));
                conditions.push(new KeyPair('Kleiner', 'LT'));
                conditions.push(new KeyPair('Kleiner oder gleich', 'LE'));
            }

            return conditions;
        }

        constructor(component:IComponent, sensorName:string) {
            this.component = component;
            component.sensors.forEach((iotI:IotInterface, idx:number) => {
                if (iotI.name == sensorName) {
                    iotI.properties.forEach((prop:IProperty, idx:number) => {
                            if (prop.name == 'VALUEPROPERTY')
                                this.valueProp = prop;

                        }
                    )
                }
            })
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

            //this.scope.activation;

            this.scope.sensorName = $stateParams.sensorName;
            this.componentService = componentService;

            componentService
                .loadComponentBySerialNo(
                $stateParams.iotId, (
                    (c:IComponent)=> {
                        this.scope.sensorIot = c;
                        this.scope.condition = new Condition(c, this.scope.sensorName);
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
