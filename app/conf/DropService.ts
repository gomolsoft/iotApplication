/**
 * Created by sandro on 30.04.15.
 */
/// <reference path="../index.ts" />

class DropService {
    sensor:IComponent;

    myService:restangular.IService;

    /* @ngInject */
    static $inject = ['Restangular'];

    constructor(myService:restangular.IService) {
        this.myService = myService;
    }

    setSensor(sensor:IComponent):void {
        this.sensor = sensor;
    }

    getSensor():IComponent {
        return this.sensor;
    }

    onSensorDrop(c:IComponent):void {

        console.log('onDrop myService' + c.serialNo);
    }
}