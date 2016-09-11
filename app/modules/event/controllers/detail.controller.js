'use strict';

(function () {
	function mController($scope, $state, poiModel, uiGmapGoogleMapApi) {
		var id = $state.params.id
			, pid = $state.params.pid
			, self = this;

		this.map = {
			center: {
				latitude: 0, longitude: 0
			},
			zoom: 10,
			showMarkers: true,
			markers: []
		};

		$scope.LoadPOI = function (pid) {
			return poiModel.query({id: pid}, function (pois) {
				if (pois && pois.length) {
					var poi = pois[0];
					self.description = poi.description;
					self.secondaryDescription = poi.secondaryDescription;
				}
			});
		};

		$scope.addMarker = function () {
			var event = _.find($scope.$parent.events, {id: id});
			(event) && self.map.markers.push(event);
		};

		$scope.LoadPOI(pid);

		if (!$scope.$parent.events.length)
			$scope.$parent.loadEvents().$promise.then($scope.addMarker);
		else
			$scope.addMarker();
	}

	mController.$inject = ['$scope', '$state', 'poi.model', 'uiGmapGoogleMapApi'];

	angular.module('event')
		.controller('DetailController', mController);

})();
