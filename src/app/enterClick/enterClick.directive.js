(function() {
	
    'use strict';

    function enterClick() {
    	return function (scope, element, attrs) {
		    element.on("keydown keypress", function(event) {
		        if (event.which === 13) {
		            scope.$apply(function() {
		                scope.$eval(attrs.enterClick);
		            });
					event.preventDefault();
		        }
		    });
		};
    }

    angular
	    .module("app")
	    .directive("enterClick", enterClick);
})();