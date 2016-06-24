'use strict';

angular.module('angular-wireframe-app', [
    'ngResource',
    'ngAnimate',
    'ngTouch',
    'ngSanitize',
    'ngRoute',
    'ui.route',
    'core',
    'filters',
    'services',
    'directives',
    'controllers',
    'angular-websql'
]);

angular.module('core', []);
angular.module('filters', []);
angular.module('services', []);
angular.module('directives', []);
angular.module('controllers', []);

angular.element(document).ready(function() {
    if (window.location.hash === '#_=_') window.location.hash = '#!';
});
