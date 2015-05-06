/**
 * Created by Sandro on 06.05.15.
 */

/// <reference path="../../index.ts" />

module app {
    'use strict';

    export var LogicDirective = (componentService:ComponentService):ng.IDirective => {
        return {
            link: () => {
                console.log("YYYYYYYYYYY");
            }
        };
    };

    LogicDirective.$inject = ['ComponentService'];
}
