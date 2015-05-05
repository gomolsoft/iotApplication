/**
 * Created by sandro on 30.04.15.
 */
/// <reference path="../index.ts" />

class ComponentService {
    myService:restangular.IService;
    locationService:LocationService;

    updateListTask:Function;

    /* @ngInject */
    static $inject = ['Restangular', 'LocationService'];

    constructor(myService:restangular.IService, locationService:LocationService) {
        this.myService = myService;
        this.locationService = locationService;

    }

    reinit() {
        this.myService.one('device/reinit')
            .get()
            .then((components:IComponent[]) => {
                this.enritchAll(components);
                this.updateListTask(components)
            });
    }

    loadByType(type:string) {
        this.myService.all('device/devices')
            .getList()
            .then((components:IComponent[]) => {
                this.enritchAll(components);
                this.updateListTask(components)
            });
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
            .then(
            (components:IComponent[]) => {
                this.enritchAll(components);
                updateCb(components);
            }
        );
    }

    onSensorDrop(dropElement:IComponent) {
        this.myService
            .one('device', dropElement.serialNo)
            .post('basicRegister')
            .then((components:IComponent[]) => {
                this.enritchAll(components);
                this.updateListTask(components)
            });
    }

    unconfirmedMessages(updateCb:(msgCnt:number) => void) {
        this.myService
            .one('device/messages')
            .get()
            .then((msgCnt:number) => updateCb(msgCnt));
    }

    enritchAll(components:IComponent[]) {
        components.forEach((c:IComponent, idx:number) => {
            this.locationService.loadRoomByComponent(c);
        });
    }

    loadComponentBySerialNo(serialNo:string, updateCb:(component:IComponent) => void) {
        this.myService
            .one('device', serialNo)
            .get()
            .then((c:IComponent) => updateCb(c));
    }
}