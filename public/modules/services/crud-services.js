'use strict';

angular.module('services').factory('API', ['$resource', '$rootScope', function($resource, $rootScope) {
    return {
        example1: function() {
            return $resource($rootScope.apiURL + '/xxx', {});
        },
        example2: function() {
            return $resource($rootScope.apiURL + '/xxx', {}, {
                get: {
                    isArray: true
                }
            });
        },
        example3: function() {
            return $resource($rootScope.apiURL + '/xxx/:xxx', {
                'xxx': '@xxx'
            });
        }
    };
}]);
