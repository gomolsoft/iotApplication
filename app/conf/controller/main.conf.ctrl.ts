/**
 * Created by sandro on 04.05.15.
 */
/// <reference path="../../index.ts" />

module app {
    'use strict';

    interface IMainConfTab {
        heading: string
        route: string
        active: boolean
    }

    interface IMainConfScope extends ng.IScope {
        tabs: IMainConfTab[]
        go(route:string): void
        active(route:string): boolean

        sensors: IComponent[]
        actors: IComponent[]

        device: IDevice[]

    }

    export class MainConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', '$state', 'ComponentService'];

        scope:IMainConfScope;
        state:angular.ui.IStateService;
        componentService:ComponentService;

        constructor($scope:IMainConfScope, $state:angular.ui.IStateService, componentService:ComponentService) {
            this.scope = $scope;
            this.state = $state;
            this.componentService = componentService;

            this.scope.tabs = [
                {heading: "Sensoren", route: "conf.sensor", active: true},
                {heading: "Aktuatoren", route: "conf.aktor", active: false},
            ];

            $scope.$on("$stateChangeSuccess", function () {
                $scope.tabs.forEach(function (tab) {
                    tab.active = $scope.active(tab.route);
                });
            });

            $scope.go = (route) => this.go(route);
            $scope.active = (route):boolean =>this.active(route);

            componentService.loadListElemv2((components) => this.updateSensors2(components));
            //componentService.loadListElem((components) => this.updateSensors(components), 'sensors');
            //componentService.loadListElem((components) => this.updateActors(components), 'actors');

        }

        updateSensors2(components:IDevice[]) {
            this.scope.device = components;
            //this.scope.sensors[0].properties['Feuchtigkeit'][0].propertyName
            //this.componentService.loadByType('sensors')
        }

        updateSensors(components:IComponent[]) {
            this.scope.sensors = components;
            //this.scope.sensors[0].properties['Feuchtigkeit'][0].propertyName
            //this.componentService.loadByType('sensors')
        }

        updateActors(components:IComponent[]) {
            this.scope.actors = components;
            //this.componentService.loadByType('sensors')
        }

        go(route:string) {
            this.state.go(route);
        }

        active(route:string) {
            return this.state.is(route);
        }
    }
}
