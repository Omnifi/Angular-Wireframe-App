'use strict';

// Setting up route
angular.module('angular-wireframe-app').run(['$route', '$rootScope', '$timeout', '$location', 'Error', function($route, $rootScope, $timeout, $location, Error) {

    //bootstrap globals
    $rootScope.apiURL = window.api;
    $rootScope.env = window.env || 'development';
    $rootScope.titlePostfix = ' - Wireframe API App';

    //setup vars
    $rootScope.country = 'UK';
    $rootScope.location = 'strafordcity';

    //manage menu state and loader
    $rootScope.isCollapsed = true;
    $rootScope.stateIsLoading = true;

    //on route start
    $rootScope.$on('$routeChangeStart', function(event, current, previous) {
        //collapse menu
        $rootScope.isCollapsed = true;
        //show loader
        $rootScope.stateIsLoading = true;
        if (current && current.hasOwnProperty('$$route')) {
            window.document.title = current.$$route.title + $rootScope.titlePostfix;
        } else {
            //else if hashbang not recognised - go to signin
            event.preventDefault();
            $location.path('/error');
        }
    });

    // on route success
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        //hide loader
        $rootScope.stateIsLoading = false;
    });

    //on route fail
    $rootScope.$on('$routeChangeError', function(event, current, previous) {
        // on error redirect to log in
        $location.path('/error');
    });

}]).config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function($q) {
        return {
            'responseError': function(response) {
                if (response.status == 401) {
                    //Alert.open(false,'401 Error');
                }
                if (response.status == 500) {
                    //Alert.open(false,'500 Error');
                }
                // Always reject (or resolve) the deferred you're given
                return $q.reject(response);
            }
        };
    });
}]);
