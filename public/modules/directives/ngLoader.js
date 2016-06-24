'use strict';

angular.module('directives').directive('loader', [function() {
    return {
        restrict: 'E',
        scope: false,
        replace: true,
        template: '<div class="text-center"><img src="/images/loader.gif" class="margin-top-lg margin-bottom-lg" /></div>'
    };
}]);
