(function() {
    'use strict';

    angular
        .module('app.admin.contentUser')
        .controller('FoldersController', FoldersController);

    /* @ngInject */
    function FoldersController($scope, $state, $stateParams, $firebaseArray, DataUser, UserFolder, FolderCrumbs) {
        var vm = this;
        
        vm.openFolder = openFolder;
        vm.clickFolder = clickFolder;
        
        vm.$onInit = function() {
            UserFolder.getFolders()
                .$loaded()
                .then(function(data) {
                    if (data.length) {
                        data.forEach(function(el, i) {
                            if (el.userId === $stateParams.userId) {
                                var key = data.$keyAt(i);
                                var record = data.$getRecord(key);
                                vm.folders = record;
                            }
                        });
                    }
                });
        };
       
        var folderHandler = $scope.$on('addFolder', function(e, data, content) {
            vm.foldersData = data;
            vm.folders = content;
        });

        function openFolder(folder, user) {
            var data = {
                name: folder.name,
                id: folder.folderId
            };
            FolderCrumbs.setCrumbs(data);
            $state.go('triangular.userFolder', {
                userId: user.$id,
                folderName: folder.name,
                folderId: folder.folderId
            });
        }

        function clickFolder(folder, index, selected, setFolder) {
            if (setFolder[index]) {
                selected.push(folder);
            }
            else {
                selected.forEach(function(el, i, arr) {
                    if (el.folderId === folder.folderId) {
                        arr.splice(i, 1);
                    }
                });
            }
        }

        vm.$onDestroy = function(){
            folderHandler();
        };
    }
})();