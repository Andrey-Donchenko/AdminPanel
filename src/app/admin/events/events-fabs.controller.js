(function() {
    'use strict';

    angular
        .module('app.admin.events')
        .controller('EventsFabController', EventsFabController);

    /* @ngInject */
    function EventsFabController($rootScope) {
        var vm = this;
        vm.addEvent = addEvent;

        ////////////////

        function addEvent($event) {
            $rootScope.$broadcast('addEvent', $event);
        }
    }
})();