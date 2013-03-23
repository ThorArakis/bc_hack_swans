var app = angular.
	module('outfitter', ['$strap.directives']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/', {templateUrl: 'partials/home', controller: HomeCtrl}).
		when('/chris', {templateUrl: 'partials/chris', controller: ChrisCtrl}).
		when('/details', {templateUrl: 'partials/details', controller: DetailsCtrl}).
		otherwise({redirectTo: '/'}) }]).
	run(function($location) {
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

