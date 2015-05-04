/// <reference path="../../index.ts" />

module app {
  'use strict';

  interface INavbarScope extends ng.IScope {
    unreadMessages: number
  }

  export class NavbarCtrl {

    /* @ngInject */
    static $inject = ['$scope', 'ComponentService'];

    constructor($scope:INavbarScope, componentService:ComponentService) {
      componentService.unconfirmedMessages((unreadMsg) => {
        $scope.unreadMessages = unreadMsg
      });
    }
  }

}
