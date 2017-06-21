(function() {
    'use strict';

    angular
        .module('app.authentication')
        .config(moduleConfig);

    var required = {
        required: ["Auth", function(Auth) {
            return Auth.$waitForSignIn();
        }]
    };
    /* @ngInject */
    function moduleConfig($stateProvider) {

        $stateProvider
        .state('auth', {
            abstract: true,
            views: {
                'root': {
                    templateUrl: 'app/authentication/layouts/auth.tmpl.html'
                }
            }
        })
        .state('auth.login', {
            url: '/auth/login',
            templateUrl: 'app/authentication/login/login.tmpl.html',
            controller: 'LoginController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('auth.signup', {
            url: '/auth/signup',
            templateUrl: 'app/authentication/signup/signup.tmpl.html',
            controller: 'SignupController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('auth.lock', {
            url: '/auth/lock',
            templateUrl: 'app/authentication/lock/lock.tmpl.html',
            controller: 'LockController',
            controllerAs: 'vm',
            resolve: required
        })
        .state('auth.forgot', {
            url: '/auth/forgot',
            templateUrl: 'app/authentication/forgot/forgot.tmpl.html',
            controller: 'ForgotController',
            controllerAs: 'vm',
            resolve: required
        });
    }
})();