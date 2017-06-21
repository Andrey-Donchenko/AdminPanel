(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state, Auth, triSettings) {
        var vm = this;
        
        vm.loginClick = loginClick;
        vm.triSettings = triSettings;
        vm.user = {
            email: '',
            password: ''
        };

        vm.$onInit = function() {
            var check = localStorage.getItem('fireEmail');
            if (check) {
                $state.go("auth.lock");
            }
        };

        function loginClick() {
            Auth.$signInWithEmailAndPassword(vm.user.email, vm.user.password)
            .then(function(firebaseUser) {
                if (vm.user.rememberMe) {
                    localStorage.setItem('fireEmail', firebaseUser.email);
                }
                $state.go('triangular.users');
            }).catch(function(error) {
                vm.showError = true;
                vm.error = error;
            });
        } 
    }
})();