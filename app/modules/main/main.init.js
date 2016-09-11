/**
 * Created by KaiNguyen on 9/10/16.
 */
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

/*// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function ($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');
	}
]);*/

angular.module(ApplicationConfiguration.applicationModuleName).config(
	function (localStorageServiceProvider, uiGmapGoogleMapApiProvider, $urlRouterProvider, $resourceProvider) {
		//default router
		$urlRouterProvider.otherwise('/');

		$resourceProvider.defaults.stripTrailingSlashes = false;

		localStorageServiceProvider.setPrefix('_fes');

		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyBTosz6Uzf5qijKjeJ98BVL8Jwt9ivtlUI',
			v: '3.25', //defaults to latest 3.X anyhow
			libraries: ''
		});
	});

//Manual bootstrap angular
angular.element(document).ready(function () {
	// init the app
	angular
		.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
