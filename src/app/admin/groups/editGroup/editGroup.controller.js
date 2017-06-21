(function() {
    'use strict';

    angular
        .module('app.admin.editGroup')
        .controller('EditGroupController', EditGroupController);

    /* @ngInject */
    function EditGroupController($state, $stateParams, DataGroup) {
        var vm = this;
        vm.editGroup = editGroup;

        vm.$onInit = function() {
            DataGroup.getGroups()
                .$loaded()
                .then(function(data) {
                    vm.group = data.$getRecord($stateParams.groupId);
                    vm.load = true;
                    if (!vm.group) {
                        $state.go('404');
                    }
                });
        };
        
        function editGroup() {
            DataGroup.editGroup(vm.group);
            $state.go('triangular.groups');
        }
    }
})();