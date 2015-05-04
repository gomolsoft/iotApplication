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

    loadByType(type:string) {
        this.myService.all('device/devices')
            .getList()
            .then((components:IComponent[]) => this.updateListTask(components));
    }

    loadListElem(updateCb:(components:IComponent[]) => void, compoType?:string) {
        var link = 'device/';
        if (compoType == undefined) {
            link = link + 'devices';
        } else {
            link = link + 'bytype/' + compoType;
        }
        this.myService.all(link)
            .getList()
            .then((components:IComponent[]) => updateCb(components));
    }

    onSensorDrop(dropElement:IComponent) {
        this.myService
            .one('device', dropElement.serialNo)
            .post('basicRegister')
            .then((components:IComponent[]) => this.updateListTask(components));
    }

    unconfirmedMessages(updateCb:(msgCnt:number) => void) {
        this.myService
            .one('device/messages')
            .get()
            .then((msgCnt:number) => updateCb(msgCnt));
    }
}