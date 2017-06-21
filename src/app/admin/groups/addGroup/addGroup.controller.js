(function() {
    'use strict';

    angular
        .module('app.admin.addGroup')
        .controller('AddGroupController', AddGroupController);

    /* @ngInject */
    function AddGroupController($state, DataGroup) {
        var vm = this;
        vm.addGroup = addGroup;
        
        function addGroup(isValid) {
            if (isValid) {
                DataGroup.addGroup(vm.group);
                $state.go('triangular.groups');
            }
        }
    }
})();