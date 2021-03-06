(function() {
	
    'use strict';

    angular
    	.module("app.authentication")
		.run(["$rootScope", "$state", run]);

	function run ($rootScope, $state) {
		
		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
		    if (error === "AUTH_REQUIRED") {
	  			$state.go("auth.login");
			}
		});
	}
})();