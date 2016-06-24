'use strict';

angular.module('services').factory('Error', ['$rootScope', function($rootScope) {
    return function(error, message) {
    	//TODO - can hook up a reporting service if required
        console.warn(error, message);
    };
}]);
