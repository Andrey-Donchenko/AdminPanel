(function() {

    'use strict';

	function DataGroup ($firebaseArray, DataUser) {
	 	var ref = firebase.database().ref("groups");
	 	var factory = {
	 		addGroup: addGroup,
	 		getGroups: getGroups,
	 		editGroup: editGroup,
	 		deleteGroup: deleteGroup
	 	};
	 	return factory;

	 	function addGroup(group) {
	 		getGroups().$add(group);
	 	}

	 	function getGroups() {
	  		return $firebaseArray(ref);
	 	}

	 	function editGroup(group) {
	 		getGroups()
	 			.$loaded()
	  			.then(function(data) {
	  				var record = data.$getRecord(group.$id);
	  				record = Object.assign(record, group);
	  				data.$save(record);
	 			});
	 	}

	 	function deleteGroup(item) {
	 		var arr = [];
	 		getGroups()
	 			.$loaded()
	  			.then(function(data) {
	  				if (!Array.isArray(item)) {
	  					arr.push(item);
	  				}
	  				else {
	  					arr = item;
	  				}
	  				arr.forEach(function(group) {
	  					var record = data.$getRecord(group.$id);
		  				data.$remove(record);
	  				});
	  			});
	 	}
	}
	   	
	angular
		.module('app')
		.factory('DataGroup', [
			'$firebaseArray',
			DataGroup
		]);
})();