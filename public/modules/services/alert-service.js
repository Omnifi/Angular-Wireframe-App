'use strict';

//Alert.open(false,'Oh no something happened');
//Alert.open(true,'YAY!').then(function(str){
//     str === 'closed'
//});

// alert service for handling modal messages
angular.module('services').factory('Alert', ['$rootScope', '$q', '$templateCache', '$compile', function($rootScope, $q, $templateCache, $compile) {

    var template = 'modules/views/partials/alert.html';

    var modalDefaults = {
        backdrop: true,
        keyboard: true,
        show: true
    };

    var modalScope = $rootScope.$new();

    var modal = angular.element($compile($templateCache.get(template))(modalScope)).appendTo(document.body);

    var api = {
        open: function(success, message) {
            modalScope.success = success;
            modalScope.content = message;
            var deferred = $q.defer();
            modal.modal(modalDefaults).one('hidden.bs.modal', function() {
                deferred.resolve('closed');
            });
            return deferred.promise;
        }
    };

    return api;

}]);
