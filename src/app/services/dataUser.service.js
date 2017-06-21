(function() {

    'use strict';

	function DataUser ($firebaseArray, $firebaseStorage) {
	 	var ref = firebase.database().ref("users");
	 	var factory = {
	 		addUser: addUser,
	 		getUsers: getUsers,
	 		editUser: editUser,
	 		changeFileName: changeFileName,
	 		deleteUser: deleteUser,
	 		deleteFiles: deleteFiles,
	 		deleteNestedContent: deleteNestedContent,
	 		reloadGroup: reloadGroup
	 	};
	 	return factory;

	 	function addUser(user) {
	 		getUsers().$add(user);
	 	}

	 	function getUsers() {
	  		return $firebaseArray(ref);
	 	}

	 	function editUser(user) {
	 		getUsers()
	 			.$loaded()
	  			.then(function(data) {
	  				var record = data.$getRecord(user.$id);
	  				Object.assign(record, user);
	  				data.$save(record);
	 			});
	 	}

	 	function changeFileName(userId, item, newFileName) {
	 		getUsers()
	 			.$loaded()
	  			.then(function(data) {
	  				var ref = firebase.storage().ref(item.fullPath);
                    var storage = $firebaseStorage(ref);
	  				var metadata = {
                        contentDisposition: 'attachment; filename="' + newFileName + '"'
                    };
                    storage.$updateMetadata(metadata);
	  				var record = data.$getRecord(userId);
	  				record.content.forEach(function(el, i) {
	  					if (el.fullPath === item.fullPath) {
	  						el.name = newFileName;
	  					}
	  				});
	  				data.$save(record);
	  			});
	  	}	

	 	function deleteUser(item) {
	 		var arr = [];
	 		getUsers()
	 			.$loaded()
	  			.then(function(data) {
	  				if (!Array.isArray(item)) {
	  					arr.push(item);
	  				}
	  				else {
	  					arr = item;
	  				}
	  				arr.forEach(function(user) {
	  					var record = data.$getRecord(user.$id);
		  				data.$remove(record);
		  				if (user.avatar) {
		  					firebase.storage().ref("avatars/" + user.avatar.name).delete();
		  				}
	  				});
	  				arr.length = 0;
	  			});
	 	}

	 	function deleteFiles(userId, item, arrCheck) {
	 		var arr = [];
	 		getUsers()
	 			.$loaded()
	  			.then(function(data) {
	  				if (!Array.isArray(item)) {
	  					arr.push(item);
	  				}
	  				else {
	  					Object.assign(arr, item);
	  				}
	  				arr.forEach(function(content) {
	  					var ref = firebase.storage().ref(content.fullPath);
                        var storage = $firebaseStorage(ref);
                        storage.$delete()
	                        .then(function() {
	                        	var record = data.$getRecord(userId);
	                        	record.content.forEach(function(el, i) {
	                        		if (el.fullPath === content.fullPath) {
	                        			record.content.splice(i, 1);
	                        		}
	                        	});
								data.$save(record);
								if (Array.isArray(item)) {
									item.pop();
								}
	                        });
	  				});
	  				if (arrCheck) {
						arrCheck.length = 0;
					}
	  			});
	 	}

	 	function deleteNestedContent(userId, folderId) {
	 		getUsers()
	 			.$loaded()
	  			.then(function(data) {
	  				var record = data.$getRecord(userId);
	  				if (!record.content) {
	  					return;
	  				}
	  				record.content.forEach(function(el, i, arr) {
	  					if (el.dest === folderId) {
	  						var ref = firebase.storage().ref(el.fullPath);
	  						var storage = $firebaseStorage(ref);
                    		storage.$delete()
                    			.then(function() {
                    				arr.splice(i, 1);
                    				data.$save(record);
                    			});
                    	}
	  				});
	            });
	 	}

	 	function reloadGroup(groupName) {
	 		getUsers()
	 			.$loaded()
	  			.then(function(data) {
	  				data.forEach(function(el) {
	  					if (el.group === groupName) {
	  						el.group = '';
	  						data.$save(el);
	  					}
	  				});
	  			});
	 	}
	}
	   	
	angular
		.module('app')
		.factory('DataUser', [
			'$firebaseArray',
			'$firebaseStorage',
			DataUser
		]);
})();