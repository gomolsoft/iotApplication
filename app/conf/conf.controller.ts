/**
 * Created by sandro on 21.04.15.
 */
/// <reference path="../index.ts" />

module app {
    'use strict';

    interface IConfScope extends ng.IScope {
        dropElem: IComponent

        onDrop: Function
        doTask(c:IComponent): void
        startCallback (event, ui, component:IComponent): void

        isConfModeEnabled(): boolean

        deviceList: IComponent[]

        componentListViewMode: string
        componentListView: string
        init(): void
    }

    export class ConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', 'ComponentHandler', 'ComponentService', '$window'];

        scope:IConfScope;
        componentHandler:ComponentHandler;

        $window:ng.IWindowService;


        updateList = (components:IComponent[]) => {
            this.scope.deviceList = components;
        };

        constructor($scope:IConfScope, componentHandler:ComponentHandler, componentService:ComponentService, $window:ng.IWindowService) {
            this.scope = $scope;
            this.componentHandler = componentHandler;
            this.$window = $window;

            componentService.updateListTask = this.updateList;

            $scope.componentListViewMode = 'S';
            $scope.componentListView = 'Sensoren';

            $scope.onDrop = () => this.myOnDrop();

            $scope.startCallback = (event, ui, component:IComponent) => this.startCallback(event, ui, component);

            $scope.init = () => this.init();
            $scope.doTask = (c:IComponent) => this.doTask(c);

            componentService.updateListTask();

            $scope.isConfModeEnabled = () => this.confModeEnabled();
        }

        private init() {
            this.componentHandler.clearSelection();
            console.log('init (ConfCtrl)');
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
            this.componentHandler.onSensorDrop(this.scope.dropElem);

            this.scope.componentListView = 'Aktuatoren';
            this.scope.componentListViewMode = 'A';

            this.$window.location.href = "#/config/" + this.scope.dropElem.serialNo;

            this.scope.$apply();
        }

        private startCallback(event, ui, component:IComponent) {
            console.log('You started draggin: ' + component.serialNo);
        }
    }
}
