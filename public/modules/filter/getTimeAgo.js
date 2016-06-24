'use strict';

angular.module('filters').filter('timeago', function() {
    return function(timestamp) {
        return moment(timestamp).fromNow();
    };
});
