(function() {
    'use strict';

    angular
        .module('app.admin.contentUser')
        .controller('CrumbsController', CrumbsController);

    /* @ngInject */
    function CrumbsController($state, FolderCrumbs) {
        var vm = this;
        
        vm.navigateCrumb = navigateCrumb;
        
        vm.$onInit = function() {
            vm.crumbs = FolderCrumbs.getCrumbs();
        };

        function navigateCrumb(crumb, user) {
            if (!crumb.id) {
                FolderCrumbs.editCrumbs(crumb);
                $state.go('triangular.userStore', {userId: user.$id});
            }
            else {
                FolderCrumbs.editCrumbs(crumb);
                $state.go('triangular.userFolder', {
                    userId: user.$id,
                    folderName: crumb.name,
                    folderId: crumb.id
                });
            }
        }
    }
})();