/**
 * Created by Sandro on 06.05.15.
 */

/// <reference path="../../index.ts" />

module app {
    'use strict';

    export var LogicDirective = (componentService:ComponentService, componentHandler:ComponentHandler, compile):ng.IDirective => {
        return {
            restrict: 'E',

            replace: false,

            scope: {
                component: '='
            },

            link: (scope, elem, attrs) => {
                /*
                 componentService.loadComponentBySerialNo(elem.serialNo, (component:IComponent) => {
                 });
                 */
                console.log(attrs);
            },

            template: 'Hello, {{component.name}}'
        };
    };

    LogicDirective.$inject = ['ComponentService', 'ComponentHandler', '$compile'];
}
