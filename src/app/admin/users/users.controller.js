(function() {
    'use strict';

    angular
        .module('app.admin.users')
        .controller('UsersController', UsersController);

    /* @ngInject */
    function UsersController($q, $mdDialog, DataUser) {
        var vm = this;

        vm.getUsers = getUsers;
        vm.removeFilter = removeFilter;
        vm.selected = [];
        vm.options = {
            limitSelect: true,
            pageSelect: true
          };
        vm.query = {
            filter: '',
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
            getUsers();
        };
        
        function getUsers() {
            DataUser.getUsers()
                .$loaded()
                .then(function(data) {
                    vm.users = data;
                    vm.load = true;
                });
        }
     
        function removeFilter() {
            vm.filter.show = false;
            vm.query.filter = '';

            if(vm.filter.form.$dirty) {
                vm.filter.form.$setPristine();
            }
        }
    }
})();