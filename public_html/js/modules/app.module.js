angular.module('App', ['ngRoute']);

angular.module('App').config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

angular.module('App').config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/index.view.html',
		controller:  'indexController'
	})
	.when('/company', {
		templateUrl: 'views/company.view.html',
		controller:  'companyController'
	})
	.otherwise({
			redirectTo: '/'
	});
});