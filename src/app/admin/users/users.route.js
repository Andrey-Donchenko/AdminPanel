(function() {
    'use strict';

    angular
        .module('app.admin.users')
        .config(moduleConfig);

    var required = {
        required: ["Auth", function(Auth) {
            return Auth.$requireSignIn();
        }]
    };
    /* @ngInject */
    function moduleConfig($stateProvider, triMenuProvider) {

        $stateProvider
        .state('triangular.users', {
            url: '/users',
            templateUrl: 'app/admin/users/users.tmpl.html',
            controller: 'UsersController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'layout-column'
                }
            },
            resolve: required
        })
        // .state('triangular.profile', {
        //     url: '/profile',
        //     templateUrl: 'app/admin/profile/profile.tmpl.html',
        //     controller: 'ProfileController',
        //     controllerAs: 'vm',
        //     resolve: required
        // })
        .state('triangular.editUser', {
            url: '/editUser/:userId',
            templateUrl: 'app/admin/users/editUser/editUser.tmpl.html',
            controller: 'EditUserController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('triangular.createUser', {
            url: '/createUser',
            templateUrl: 'app/admin/users/createUser/createUser.tmpl.html',
            controller: 'CreateUserController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('triangular.userStore', {
            url: '/:userId/store',
            templateUrl: 'app/admin/users/contentUser/contentUser.tmpl.html',
            controller: 'ContentUserController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('triangular.userFolder', {
            url: '/:userId/store/:folderId/:folderName',
            templateUrl: 'app/admin/users/contentUser/contentUser.tmpl.html',
            controller: 'ContentUserController',
            controllerAs: 'vm',
            resolve: required
        });

        triMenuProvider.addMenu({
            name: 'Users',
            icon: 'zmdi zmdi-accounts-list-alt',
            type: 'link',
            state: 'triangular.users'
        });
    }
})();
