var app = angular.
	module('outfitter', ['$strap.directives', 'ui.bootstrap']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {templateUrl: 'partials/home', controller: HomeCtrl}).
		otherwise({redirectTo: '/'}) }]).
	run(function($location) {
		$location.path('/');
	});

