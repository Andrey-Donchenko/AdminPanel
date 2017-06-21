(function() {
    'use strict';

    angular
        .module('app.admin.editUser')
        .controller('EditUserController', EditUserController);

    /* @ngInject */
    function EditUserController($state, $stateParams, $firebaseStorage, DataUser) {
        var vm = this;

        vm.editUser = editUser;
        vm.checkValid = checkValid;

        vm.$onInit = function() {
            DataUser.getUsers()
                .$loaded()
                .then(function(data) {
                    vm.user = data.$getRecord($stateParams.userId);
                    vm.load = true;
                    if (!vm.user) {
                        $state.go('404');
                    }
                });
        };
        
        function editUser() {
            if (vm.newPassword) {
                vm.user.password = vm.newPassword;
            }
            if (vm.file) {
                editFullData();
            }
            else {
                editUserData();
            }
        }

        function editFullData() {
            if (vm.user.avatar) {
                firebase.storage().ref("avatars/" + vm.user.avatar.name).delete();
            }
            var fileName = Math.round(Math.random() * 1000) + vm.file.name;
            var ref = firebase.storage().ref("avatars/" + fileName);
            var storage = $firebaseStorage(ref);
            var uploadTask = storage.$put(vm.file);
            uploadTask.$complete(function(snapshot) {
                vm.user.avatar = {
                    url: snapshot.downloadURL,
                    name: fileName
                };
                editUserData();
            });
        }

        function editUserData() {
            DataUser.editUser(vm.user);
            $state.go('triangular.users');
        }
        
        function checkValid() {
            return (vm.newPassword !== vm.confirm);
        }
    }
})();