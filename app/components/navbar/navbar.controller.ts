/// <reference path="../../index.ts" />

module app {
  'use strict';

  interface INavbarScope extends ng.IScope {
    date: Date
  }

  export class NavbarCtrl {
    /* @ngInject */
    constructor ($scope: INavbarScope) {
      $scope.date = new Date();
    }
  }

}
