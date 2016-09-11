/**
 * Created by KaiNguyen on 9/10/16.
 */

'use strict';
(function () {
	function apiService($resource) {
		function getRequestUrl(url) {
			return (/^https?:\/\//.test(url))
				? url
				: __env.apiUrl + url;
		}

		function resource(url, params, cb) {
			return $resource(getRequestUrl(url), params, cb);
		}

		return {
			resource: resource
		};
	}

	apiService.$inject = ['$resource'];

	angular
		.module(ApplicationConfiguration.applicationModuleName)
		.factory('apiService', apiService);
})();
