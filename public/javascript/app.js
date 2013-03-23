var app = angular.
	module('outfitter', ['$strap.directives']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {templateUrl: 'partials/home', controller: HomeCtrl}).
		otherwise({redirectTo: '/'}) }]).
	run(function($location) {
		$location.path('/');
	});
//
//app.directive('myCarousel', function($parse) {
//	return function($scope, $element, $attrs) {
//		var ngModel = $parse($attrs.ngModel);
//		$(function() {
//			$element.carousel();
//		});
//	}
//});

