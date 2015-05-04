/**
 * Created by sandro on 04.05.15.
 */
/// <reference path="../index.ts" />

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
    }

    export class MainConfCtrl {
        /* @ngInject */
        static $inject = ['$scope', '$state'];

        scope:IMainConfScope;
        state:angular.ui.IStateService;

        constructor($scope:IMainConfScope, $state:angular.ui.IStateService) {
            this.scope = $scope;
            this.state = $state;

            this.scope.tabs = [
                {heading: "Tab 1", route: "main.tab1", active: false},
                {heading: "Tab 2", route: "main.tab2", active: false},
                {heading: "Tab 3", route: "main.tab3", active: false},
            ];


            $scope.$on("$stateChangeSuccess", function () {
                $scope.tabs.forEach(function (tab) {
                    tab.active = $scope.active(tab.route);
                });
            });
        }

        go(route:string) {
            this.state.go(route);
        }
    }
}
