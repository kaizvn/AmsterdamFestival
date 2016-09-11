// simple config for dev
(function (window) {
	window.__env = window.__env || {};

	// API url
	window.__env.apiUrl = 'http://citysdk.dmci.hva.nl/CitySDK';

	// Base url
	window.__env.baseUrl = '/';

	// Whether or not to enable debug mode
	// Setting this to false will disable console output
	window.__env.enableDebug = true;
	window.__env.applicationModuleName = 'festivalApp';
}(this));


'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
	// Init module configuration options
	var applicationModuleName = __env.applicationModuleName || 'festivalApp';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngAnimate',
		'ui.router',
		'LocalStorageModule',
		'uiGmapgoogle-maps',
		'ngSanitize'
	];

	// Add a new vertical module
	var registerModule = function (moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
