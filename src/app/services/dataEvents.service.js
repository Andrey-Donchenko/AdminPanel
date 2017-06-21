(function() {

    'use strict';

	function DataEvents ($firebaseArray) {
	 	var ref = firebase.database().ref("events");
	 	var factory = {
	 		addEvent: addEvent,
	 		getEvents: getEvents,
	 		editEvent: editEvent,
	 		deleteEvent: deleteEvent
	 	};
	 	return factory;

	 	function addEvent(event) {
	 		getEvents().$add(event);
	 	}

	 	function getEvents() {
	  		return $firebaseArray(ref);
	 	}

	 	function editEvent(eventId, newEventData) {
	 		getEvents()
	 			.$loaded()
	  			.then(function(data) {
	  				var record = data.$getRecord(eventId);
	  				record = Object.assign(record, newEventData);
	  				data.$save(record);
	 			});
	 	}

	 	function deleteEvent(eventId) {
	 		getEvents()
	 			.$loaded()
	  			.then(function(data) {
	  				var record = data.$getRecord(eventId);
		  			data.$remove(record);
	  			});
	 	}
	}
	   	
	angular
		.module('app')
		.factory('DataEvents', [
			'$firebaseArray',
			DataEvents
		]);
})();