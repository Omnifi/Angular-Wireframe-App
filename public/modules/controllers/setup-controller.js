'use strict';

angular.module('controllers').controller('SetupController', ['$scope', '$rootScope', '$location', 'Log', 'API', function($scope, $rootScope, $location, Log, API) {

    Log.add('App started');

    $scope.setup = {
        country: $rootScope.country,
        location: $rootScope.location
    };

    function loadConfig() {
        // load defaults
        //  API.xxx().get({}, function(res, headers) {
        //     if (!res || $.isEmptyObject(res)) {
        //         Error('Failed to load config: API.xxx()');
        //     } else {
        //         Log.add('Loaded config', headers());
        $location.path('/page');
        //     }
        // });
    }

    $scope.update = function() {
        $rootScope.country = $scope.setup.country;
        $rootScope.location = $scope.setup.location;
        loadConfig();
    };

    $scope.continue = function() {
        loadConfig();
    };

}]);
