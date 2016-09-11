'use strict';

(function () {
//register module
	ApplicationConfiguration.registerModule('event', ['ngAnimate']);

// Setting up route
	angular.module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider',
		function ($stateProvider) {
			$stateProvider
				.state('event', {
					url: '/',
					templateUrl: 'app/modules/event/views/event.views.html',
					controller: 'EventController as event'
				})
				.state('event.detail', {
					'url': ':id/:pid',
					templateUrl: 'app/modules/event/views/detail.views.html',
					controller: 'DetailController as detail'
				});
		}
	]).filter('unsafeHTML', function ($sce) {
		return function (val) {
			// &#65533; is  iso-8859-1 charset, this is manually convert it
			return $sce.trustAsHtml((val || '')
				.replace(/&#65533;/g, "'"));
		}
	});

})();