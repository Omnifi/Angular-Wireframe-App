'use strict';


angular.module('angular-wireframe-app').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: false,
        rewriteLinks: false
    }).hashPrefix('!');


    $routeProvider
        .when('/setup', {
            templateUrl: '/modules/views/setup.html',
            title: 'Set-up'
        })
        .when('/page', {
            templateUrl: '/modules/views/page.html',
            title: 'Page'
        })
        .otherwise({
            redirectTo: '/setup',
            title: 'Set-up'
        });

}]);
