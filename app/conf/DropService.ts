/**
 * Created by sandro on 30.04.15.
 */
/// <reference path="../index.ts" />

class DropService {
    sensor:IComponent;

    setSensor(sensor:IComponent) {
        this.sensor = sensor;
    }

    getSensor():IComponent {
        return this.sensor;
    }
}