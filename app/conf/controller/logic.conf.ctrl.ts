/**
 * Created by Sandro on 05.05.15.
 */

/// <reference path="../../index.ts" />

module app {
    'use strict';

    interface ILogicConfParam extends ng.ui.IStateParamsService {
        iotId: string
        sensorName: string

    }

    interface ILogicConfScope extends ng.IScope {
        serialNo: string
        sensorIot: IComponent

        actors: IComponent[]
    }

    export class LogicConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', '$state', '$stateParams', 'ComponentService'];

        scope:ILogicConfScope;
        state:angular.ui.IStateService;
        componentService:ComponentService;

        constructor($scope:ILogicConfScope, $state:ng.ui.IStateService, $stateParams:ILogicConfParam, componentService:ComponentService) {
            this.scope = $scope;
            this.state = $state;
            this.scope.serialNo = $stateParams.iotId;
            this.componentService = componentService;

            componentService
                .loadComponentBySerialNo(
                this.scope.serialNo, (
                    (c:IComponent)=> {
                        this.scope.sensorIot = c
                    } ))
        }

    }
}
