'use strict';

angular.module('controllers').controller('PageController', ['$scope', '$rootScope', '$location', 'Log', function($scope, $rootScope, $location, Log) {

    Log.add('App Init');

}]);
