(function() {
    'use strict';

    angular
        .module('app.admin.groups')
        .controller('GroupsController', GroupsController);

    /* @ngInject */
    function GroupsController($state, $mdDialog, DataGroup) {
        var vm = this;
        vm.getGroups = getGroups;
        vm.selected = [];
        vm.options = {
            limitSelect: true,
            pageSelect: true
          };
        vm.query = {
            limit: 10,
            order: 'name',
            page: 1
        };
        vm.limitOptions = [10, 20];
        vm.filter = {
            options: {
                debounce: 500
            }
        };
        
        vm.$onInit = function() {
            getGroups();
        };
        
        function getGroups() {
            DataGroup.getGroups()
                .$loaded()
                .then(function(data) {
                    vm.groups = data;
                });
        }
    }
})();