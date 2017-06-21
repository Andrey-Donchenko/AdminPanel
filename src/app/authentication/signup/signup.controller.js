(function() {
    'use strict';

    angular
        .module('app.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, $state, Auth, DataUser, triSettings) {
        var vm = this;

        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            name: '',
            email: '',
            password: '',
            confirm: ''
        };

        function signupClick(invalid) {
            if (invalid) {
                return;
            }
            Auth.$createUserWithEmailAndPassword(vm.user.email, vm.user.password)
                .then(function(firebaseUser) {
                    $state.go('triangular.users');
                }).catch(function(error) {
                    console.log(error);
                });
        }
    }
})();
