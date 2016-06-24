'use strict';

angular.module('directives').directive('log', ['$rootScope', 'Log', function($rootScope, Log) {
    return {
        restrict: 'E',
        scope: true,
        replace: true,
        template: '<div class="row"><div class="col-xs-12"><pre class="well" style="white-space: pre-line;margin:0;">Logging\n\r{{log}}</pre></div></div>',
        link: function($scope, $elem, attrs) {

            $scope.log = '';

            function update(){
                $scope.log = Log.fetch();
            }

            update();

            $scope.$on('log-update', update);

        }
    };
}]);
