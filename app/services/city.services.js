(function () {
	function cityService(apiService) {
		function targetPOIResource(cb) {
			return apiService.resource('/pois/:id', {id: '@id'}, cb);
		}

		function eventResource(cb) {
			return apiService.resource('/events/search', {category: 'festival', id: '@id'}, cb);
		}

		return {
			eventResource: eventResource,
			targetPOIResource: targetPOIResource
		}
	}

	cityService.$inject = ['apiService'];

	angular.module(ApplicationConfiguration.applicationModuleName).factory('cityService', cityService);
})();