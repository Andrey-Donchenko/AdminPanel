(function() {
    'use strict';

    angular
        .module('app.admin.groups')
        .config(moduleConfig);

    var required = {
        required: ["Auth", function(Auth) {
            return Auth.$requireSignIn();
        }]
    };
    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.groups', {
            url: '/groups',
            templateUrl: 'app/admin/groups/groups.tmpl.html',
            controller: 'GroupsController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            },
            resolve: required
        })
        .state('triangular.editGroup', {
            url: '/editGroup/:groupId',
            templateUrl: 'app/admin/groups/editGroup/editGroup.tmpl.html',
            controller: 'EditGroupController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('triangular.addGroup', {
            url: '/addGroup',
            templateUrl: 'app/admin/groups/addGroup/addGroup.tmpl.html',
            controller: 'AddGroupController',
            controllerAs: 'vm',
            resolve: required
        });
        
        triMenuProvider.addMenu({
            name: 'Groups',
            icon: 'fa fa-group',
            type: 'link',
            state: 'triangular.groups'
        });
    }
})();
