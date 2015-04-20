/// <reference path="../../index.ts" />
var app;
(function (app) {
    'use strict';
    var NavbarCtrl = (function () {
        /* @ngInject */
        function NavbarCtrl($scope) {
            $scope.date = new Date();
        }
        return NavbarCtrl;
    })();
    app.NavbarCtrl = NavbarCtrl;
})(app || (app = {}));
//# sourceMappingURL=navbar.controller.js.map