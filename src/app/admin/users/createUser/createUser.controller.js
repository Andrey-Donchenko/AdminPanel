(function() {
    'use strict';

    angular
        .module('app.admin.createUser')
        .controller('CreateUserController', CreateUserController);

    /* @ngInject */
    function CreateUserController($state, $firebaseStorage, DataUser) {
        var vm = this;
        
        vm.createUser = createUser;

        function createUser(isValid) {
            if (isValid) {
                if (vm.file) {
                    addFullData();
                }
                else {
                    addUserData();
                }
            }
        }

        function addFullData() {
            var fileName = Math.round(Math.random() * 1000) + vm.file.name;
            var ref = firebase.storage().ref("avatars/" + fileName);
            var storage = $firebaseStorage(ref);
            var uploadTask = storage.$put(vm.file);
            uploadTask.$complete(function(snapshot) {
                vm.user.avatar = {
                    url: snapshot.downloadURL,
                    name: fileName
                };
                addUserData();
            });
        }

        function addUserData() {
            DataUser.addUser(vm.user);
            $state.go('triangular.users');
        }

    }
})();