'use strict';

angular.module('filters').filter('urlEncode', function() {
    return function(str) {
        return window.encodeURIComponent(str);
    };
});
