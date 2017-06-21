(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LockController', LockController);

    /* @ngInject */
    function LockController($state, Auth, triSettings) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.logOut = logOut;
        vm.user = {
            name: '',
            email: '',
            password: ''
        };
        vm.triSettings = triSettings;
        
        vm.$onInit = function() {
            vm.user.email = localStorage.getItem('fireEmail');
        };

        function loginClick() {
            Auth.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
            .then(function(firebaseUser) {
                $state.go('triangular.users');
            }).catch(function(error) {
                vm.showError = true;
                vm.error = error;
            });
        } 

        function logOut() {
            localStorage.removeItem('fireEmail');
            $state.go('auth.login');
        }
    }
})();