'use strict';

angular.module('services').factory('Log', ['$rootScope', function($rootScope) {

    var api = {};

    api.log = '';

    api.fetch = function() {
        return api.log;
    };

    api.add = function(value, headers) {
        headers = headers || {};
    	if(typeof value === 'string'){
            api.log += value;
        }
        if(headers['content-length'] && headers['content-length'].length){
            api.log += '  ...  ('+Math.ceil(headers['content-length'] / 1024) + 'kb)';
        }
        api.log += '\n\r';
        $rootScope.$broadcast('log-update');
        return api;
    };

    return api;

}]);
