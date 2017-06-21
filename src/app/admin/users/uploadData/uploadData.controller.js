(function() {
    'use strict';

    angular
        .module('app.admin.users')
        .controller('AvatarUploadController', AvatarUploadController);

    /* @ngInject */
    function AvatarUploadController($scope, $timeout) {
        var vm = this;
        
        vm.status = 'idle';
        vm.uploadFile = uploadFile;

        function uploadFile($file) {
            if ($file !== null) {
                uploadStarted();
                var reader = new FileReader();
                reader.onload = function(e){
                    vm.avatar = {
                        url: e.target.result
                    };
                    $scope.$digest();
                    uploadComplete();
                }
                reader.readAsDataURL($file);
            }
        }

        function uploadStarted() {
            vm.status = 'uploading';
        }

        function uploadComplete() {
            vm.status = 'complete';
            $timeout(uploadReset, 1000);
        }

        function uploadReset() {
            vm.status = 'idle';
        }
    }
})();