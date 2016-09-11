'use strict';

(function () {
	function mController($scope, eventModel, $interval) {
		var itemsPerRow = 5;
		$scope.events = [];

		$scope.isNewRow = function (index) {
			return !(index % itemsPerRow);
		};

		$scope.loadEvents = function () {
			return eventModel.query({}, function (events) {
				if (events && events.length) {
					var newEventIds = [];
					events.forEach(function (event) {
						var eventIndex = _.findIndex($scope.events, {id: event.id});
						if (eventIndex < 0) {
							console.log('new event!', event.id);
							$scope.events.push(event);
						} else if (event.created !== $scope.events[eventIndex].created) {
							console.log('event modified:', event.id);
							$scope.events[eventIndex] = event;
						}
						newEventIds.push(event.id);
					});

					// remove non-exist events
					if (events.length != $scope.events.length) {
						_.remove($scope.events, function (ev) {
							return !(newEventIds.indexOf(ev.id));
						});
					}
				}
			});
		};

		$scope.loadEvents();


		// I heard citySDK is real-time and I try to make mine near-real-time also :D.
		$interval(function () {
			console.log('reload data');
			$scope.loadEvents();
		}, 15000);
	}

	mController.$inject = ['$scope', 'event.model', '$interval'];

	angular.module('event')
		.controller('EventController', mController);

})();
