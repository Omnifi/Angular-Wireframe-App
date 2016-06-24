'use strict';

angular.module('filters').filter('moment', function() {
    return function(timestamp, f) {
        return moment(timestamp).format(f);
    };
});
