/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="main/main.controller.ts" />
/// <reference path="../app/conf/conf.controller.ts" />
/// <reference path="../app/components/navbar/navbar.controller.ts" />
var app;
(function (app) {
    'use strict';
    angular.module('app', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'mgcrea.ngStrap', 'ngDragDrop']).controller('MainCtrl', app.MainCtrl).controller('NavbarCtrl', app.NavbarCtrl).controller('ConfCtrl', app.ConfCtrl).config(['RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:8080');
    }]).config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        }).state('config', {
            url: '/config',
            templateUrl: 'app/conf/conf.html',
            controller: 'ConfCtrl'
        });
        $urlRouterProvider.otherwise('/');
    });
})(app || (app = {}));
//# sourceMappingURL=index.js.map