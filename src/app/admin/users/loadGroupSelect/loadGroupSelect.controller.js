(function() {
    'use strict';

    angular
        .module('app.admin.users')
        .controller('LoadGroupSelectController', LoadGroupSelectController);

    /* @ngInject */
    function LoadGroupSelectController(DataGroup) {
        var vm = this;
               
        vm.$onInit = function() {
            vm.groups = [];
            DataGroup.getGroups()
                .$loaded()
                .then(function(data) {
                    data.forEach(function(el) {
                        vm.groups.push(el.name);
                    });
                    vm.groups.sort();
                });
        };
    }
})();