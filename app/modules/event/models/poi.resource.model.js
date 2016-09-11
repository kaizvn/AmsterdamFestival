// remember to config default language

(function () {
	function poiModel(modelUtils, cityService) {
		// EventModel constructor
		function POIModel(data) {
			this.id = data.id || null;
			this.lang = data.lang || 'en-GB';
			this.created = data.created || null;
			this.url = [data.base, data.id].join('/');
			this.transformDescription(data.description || []);
			this.transformTitle(data.label || []);
			this.transformLocation(data.location || {});
			this.transformStatus(data.time || []);
		}

		POIModel.prototype.transformDescription = function (data) {
			var self = this;
			// clear description;
			this.description = '';
			this.secondaryDescription = '';
			data.forEach(function (descriptionObj) {
				if (descriptionObj.type)
					self.secondaryDescription += descriptionObj.value;
				else
					self.description += descriptionObj.value;
			});
		};

		POIModel.prototype.transformTitle = function (data) {
			this.title = modelUtils.getDataByCondition(data, {term: 'primary'});
		};

		POIModel.prototype.transformLocation = function (data) {
			// get default point by condition term = entrance
			var selectedPoint = modelUtils.getDataByCondition(data.point, {term: 'entrance'}, true);
			var point = (selectedPoint && selectedPoint.Point)
				? (selectedPoint.Point.posList || '').trim().split(' ')
				: [];

			this.location = {
				coords: {
					latitude: point[0],
					longitude: point[1]
				}
			}
		};

		POIModel.prototype.transformStatus = function (time) {
			this.status = (!time || !time.length) ? 'closed' : time[0].term;
		};

		return cityService.targetPOIResource({
			query: {
				method: 'GET',
				isArray: true,
				transformResponse: function (data, header) {
					var wrapped = angular.fromJson(data);
					var result = [];

					if(!wrapped)
						return result;

					wrapped = (wrapped && wrapped.poi) ? wrapped.poi : [wrapped];
					wrapped.forEach(function (item) {
						if (!item.id)
							return;

						result.push(new POIModel(item));
					});
					return result;
				}
			}
		});

	}

	poiModel.$inject = ['modelUtils', 'cityService'];

	angular.module("event")
		.factory('poi.model', poiModel);

})();

