/**
 * Created by KaiNguyen on 9/11/16.
 */

/**
 * Created by KaiNguyen on 9/10/16.
 */

// remember to config default language

(function () {
	function modelUtils() {
		function getDataByCondition(data, condition, isResultObj) {
			var result = _.find(data, condition);
			if (isResultObj)
				return result;
			else
				return (result) ? result.value : '';
		}

		return {
			getDataByCondition: getDataByCondition
		}
	}

	modelUtils.$inject = [];

	angular.module(ApplicationConfiguration.applicationModuleName)
		.factory('modelUtils', modelUtils);
})();

