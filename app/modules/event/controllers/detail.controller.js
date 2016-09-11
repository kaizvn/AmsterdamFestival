'use strict';

(function () {
	function mController($scope, $state, poiModel, uiGmapGoogleMapApi) {
		// initialize the map object
		this.map = {
			center: {
				latitude: 37.632711,
				longitude: -120.572511
			},
			zoom: 10,
			markers: []
		};

		var id = $state.params.id
			, pid = $state.params.pid
			, self = this;

		// get POI's information
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

		// In case of we get data from direct link and $parent.events is empty
		if (!$scope.$parent.events.length)
			$scope.$parent.loadEvents().$promise.then($scope.addMarker);
		else
			$scope.addMarker();
	}

	mController.$inject = ['$scope', '$state', 'poi.model', 'uiGmapGoogleMapApi'];

	angular.module('event')
		.controller('DetailController', mController);

})();
