/**
 * Created by sandro on 30.04.15.
 */
/// <reference path="../index.ts" />

class ComponentService {
    myService:restangular.IService;

    updateListTask:Function;

    /* @ngInject */
    static $inject = ['Restangular'];

    constructor(myService:restangular.IService) {
        this.myService = myService;


    }

    reinit() {
        this.myService.one('device/reinit')
            .get()
            .then((components:IComponent[]) => this.updateListTask(components));
    }

    loadListElem() {
        this.myService.all('device/devices')
            .getList()
            .then((components:IComponent[]) => this.updateListTask(components));
    }

    onSensorDrop(dropElement:IComponent) {
        this.myService
            .one('device', dropElement.serialNo)
            .post('basicRegister')
            .then((components:IComponent[]) => this.updateListTask(components));
    }
}