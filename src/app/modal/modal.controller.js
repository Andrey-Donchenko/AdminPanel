(function() {
	
    'use strict';

    function ModalController($mdDialog, $stateParams, DataUser, DataGroup, UserFolder) {
    	var vm = this;

    	vm.addFolder = addFolder;
    	vm.editFolder = editFolder;
    	vm.deleteFolder = deleteFolder;
    	vm.deleteUser = deleteUser;
    	vm.deleteGroup = deleteGroup;
    	vm.deleteFiles = deleteFiles;
    	
    	var confirm = $mdDialog.confirm()
		    .title('Are you sure?')
		    .textContent('Item(s) will be deleted permanently')
		    .ok('delete')
		    .cancel('cancel');
    	
    	function addFolder(userId) {
    		var prompt = $mdDialog.prompt()
    			.title('Create folder')
				.textContent('Enter the name of the folder')
		      	.placeholder('Folder name')
		      	.ariaLabel('folder name')
		      	.initialValue('unnamed')
		      	.ok('apply')
		      	.cancel('cancel');
		    $mdDialog.show(prompt).then(function(result) {
		    	if ($stateParams.folderId) {
		    		var dest = $stateParams.folderId;
		    	}
		    	else {
		    		var dest = '';
		    	}
		    	var data = {
		    		userId: userId,
		    		content: [{
		    			name: result,
		    			folderId: new Date().getTime() + "",
		    			dest: dest
		    		}]
		    	};
      			UserFolder.addFolder(userId, data);
    		}, function() {
      			$mdDialog.cancel();
    		});
    	}

    	function editFolder(userId, folder) {
    		var prompt = $mdDialog.prompt()
    			.title('Edit folder')
				.textContent('Enter new name of the folder')
		      	.placeholder('Folder name')
		      	.ariaLabel('folder name')
		      	.initialValue(folder.name)
		      	.ok('apply')
		      	.cancel('cancel');
		    $mdDialog.show(prompt).then(function(result) {
		    	UserFolder.editFolder(userId, result, folder.folderId);
    		}, function() {
      			$mdDialog.cancel();
    		});
    	}

    	function deleteFolder(userId, folders, selected) {
            $mdDialog.show(confirm).then(function() {
		      	UserFolder.deleteFolder(userId, folders, selected);
			}, function() {
		      $mdDialog.cancel();
		    });
        }

    	function deleteUser(item) {
		    $mdDialog.show(confirm).then(function() {
		      	DataUser.deleteUser(item);
		    }, function() {
		      $mdDialog.cancel();
		    });
		}
		
		function deleteGroup(item) {
		    $mdDialog.show(confirm).then(function() {
		      	DataGroup.deleteGroup(item);
		      	DataUser.reloadGroup(item.name);
		    }, function() {
		      $mdDialog.cancel();
		    });
		}

		function deleteFiles(userId, item, arrCheck, selected) {
			$mdDialog.show(confirm).then(function() {
		      	DataUser.deleteFiles(userId, item, arrCheck);
		      	if (!Array.isArray(item) && selected.length) {
					selected.length = 0;
				}
		    }, function() {
		      $mdDialog.cancel();
		    });
		}
    }

    angular
	    .module("app.admin")
	    .controller("ModalController", ModalController);
})();