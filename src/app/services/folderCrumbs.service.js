(function() {

    'use strict';

	function FolderCrumbs() {
	 	var crumbs = [{name: 'Root', id: ''}];

	 	var factory = {
	 		getCrumbs: getCrumbs,
	 		setCrumbs: setCrumbs,
	 		editCrumbs: editCrumbs
	 	};
	 	return factory;

	 	function getCrumbs() {
	  		return crumbs;
	 	}

	 	function setCrumbs(data) {
	  		crumbs.push(data);
	 	}

	 	function editCrumbs(crumb) {
	  		crumbs.forEach(function(el, i, arr) {
	  			if (el.id === crumb.id) {
	  				arr.splice(i + 1, arr.length - i - 1);
	  				return;
	  			}
	  		});
	 	}
	}
	   	
	angular
		.module('app.admin.contentUser')
		.factory('FolderCrumbs', FolderCrumbs);
})();