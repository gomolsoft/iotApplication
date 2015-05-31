/**
 * Created by Sandro on 05.05.15.
 */
/// <reference path="../index.ts" />

class LocationService {
    myService:restangular.IService;

    rootLink:string = 'location';

    /* @ngInject */
    static $inject = ['Restangular'];

    constructor(myService:restangular.IService) {
        this.myService = myService;
    }

    loadRoomByComponent(component:IComponent) {
        this.myService
            .one(this.rootLink + '/device', component.serialNo)
            .get()
            .then((location:ILocation) => {
                component.room = location.locationName
            });

    }
    loadRoomByComponent2(component:IDevice) {
        this.myService
            .one(this.rootLink + '/device', component.serialNo)
            .get()
            .then((location:ILocation) => {
                component.room = location.locationName
            });

    }

}
