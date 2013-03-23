function DetailsCtrl($scope, $http) {
    $http.get("/api/products/MAR1534").success(function(response) {
		$scope.product = response;
		$scope.variant = response.variants[0];
	});
	$http.get("/api/products/MAR1534/reviews").success(function(response) {
		$scope.community = response;
	});
}
