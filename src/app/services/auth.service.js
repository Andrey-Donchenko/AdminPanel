(function() {

    'use strict';

	function Auth ($firebaseAuth) {
		return $firebaseAuth();
	}
	
	angular
		.module("app")
		.factory("Auth", ["$firebaseAuth", Auth]);
})();