/**
 * Created by Sandro on 01.05.15.
 */

/// <reference path="../index.ts" />
class ComponentHandler {
    componentService:ComponentService;

    component:IComponent;

    /* @ngInject */
    static $inject = ['ComponentService'];
    constructor(componentService:ComponentService) {
        this.componentService = componentService;


        this.component = null;
    }

    onSensorDrop(dropElement:IComponent) {
        this.component = dropElement;
        this.componentService.onSensorDrop(dropElement);

        console.log('onDrop myService' + dropElement.serialNo);
    }

    onActorDrop(dropElement:IComponent) {
        this.component = dropElement;
        this.componentService.onSensorDrop(dropElement);

        console.log('onDrop myService' + dropElement.serialNo);
    }

    clearSelection() {
        this.componentService.reinit();
        this.component = null;
    }

    getSensorComponent():IComponent {
        return this.component;
    }

    // unpdateList = (components:IComponent[]);
}