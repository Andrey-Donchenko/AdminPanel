(function() {

    'use strict';

	function UserFolder ($rootScope, $firebaseArray, $firebaseStorage, DataUser) {
	 	var ref = firebase.database().ref("folders");

	 	var factory = {
	 		addFolder: addFolder,
	 		editFolder: editFolder,
	 		deleteFolder: deleteFolder,
	 		getFolders: getFolders
	 	};
	 	return factory;

	 	function addFolder(userId, item) {
	 		getFolders()
	 			.$loaded()
                .then(function(data) {
                	if (!data.length) {
                		data.$add(item)
                			.then(function(ref) {
  								var record = data.$getRecord(ref.key);
                				$rootScope.$broadcast('addFolder', data, record);
               				});
                	}
                	else {
                		data.forEach(function(el, i) {
	                       	if (el.userId === userId) {
	                       		el.content.push(item.content[0]);
	                       		data.$save(i);
	                       		return;
		                    }
		                });
                	}
                });
	 	}

	 	function getFolders() {
	  		return $firebaseArray(ref);
	 	}

	 	function editFolder(userId, newName, folderId) {
	 		getFolders()
	 			.$loaded()
                .then(function(data) {
                	data.forEach(function(el, i) {
	                	if (el.userId === userId) {
	                    	el.content.forEach(function(content) {
	                    		if (content.folderId === folderId) {
	                    			content.name = newName;
	                    			data.$save(i);
	                       			return;
	                    		}
	                    	});
		                }
		            });
                });
	 	}

	 	function deleteFolder(userId, folders, selected) {
	 		getFolders()
	 			.$loaded()
                .then(function(data) {
                	data.forEach(function(el, i) {
	                	if (el.userId === userId) {
	                		folders.forEach(function(folder) {
                				el.content.forEach(function(content, index, arr) {
                					if (folder.folderId === content.folderId) {
                						arr.splice(index, 1);
                						data.$save(i)
                							.then(function() {
                								DataUser.deleteNestedContent(userId, folder.folderId);
                							});
                					}
                				});
                			});
	                		folders.length = 0;
	                		selected.length = 0;
	                    }
		            });
                });
	 	}
	}
	   	
	angular
		.module('app.admin.contentUser')
		.factory('UserFolder', [
			'$rootScope',
			'$firebaseArray',
			'$firebaseStorage',
			'DataUser',
			UserFolder
		]);
})();