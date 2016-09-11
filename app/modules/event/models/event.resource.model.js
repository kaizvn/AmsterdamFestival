/**
 * Created by KaiNguyen on 9/12/16.
 */

// remember to config default language

(function () {
	function eventModel(modelUtils, cityService, $resource) {
		// EventModel constructor
		function EventModel(data) {
			this.id = data.id || null;
			this.lang = data.lang || 'en-GB';
			this.created = data.created || null;
			this.url = [data.base, data.id].join('/');
			this.transformDescription(data.description || []);
			this.transformTitle(data.label || []);
			this.transformLocation(data.location || {});
		}

		// behaviour of EventModel
		EventModel.prototype.transformDescription = function (data) {
			this.description = modelUtils.getDataByCondition(data, {lang: this.lang});
		};
		EventModel.prototype.transformTitle = function (data) {
			this.title = modelUtils.getDataByCondition(data, {lang: this.lang});
		};
		EventModel.prototype.transformLocation = function (data) {
			// get default point by condition term = entrance
			var selectedPoint = modelUtils.getDataByCondition(data.point, {term: 'entrance'}, true);
			var point = (selectedPoint && selectedPoint.Point)
				? (selectedPoint.Point.posList || '').trim().split(' ')
				: [];

			var relationship = modelUtils.getDataByCondition(data.relationship, {term: 'equals'}, true) || {};

			this.location = {
				coords: {
					latitude: point[0],
					longitude: point[1]
				}
			};
			this.poiId = relationship.targetPOI;
		};

		return cityService.eventResource({
			query: {
				method: 'GET',
				isArray: true,
				transformResponse: function (data, header) {
					var wrapped = angular.fromJson(data);
					var result = [];

					if (!wrapped)
						return result;

					wrapped = (wrapped.event) ? wrapped.event : [wrapped];
					wrapped.forEach(function (item) {
						if (!item.id)
							return;

						result.push(new EventModel(item));
					});
					return result;
				}
			}
		});
	}

	eventModel.$inject = ['modelUtils', 'cityService', '$resource'];

	angular.module("event")
		.factory('event.model', eventModel);

})();

