function DetailsCtrl($scope, $http) {
    $http.get("/api/products/MAR2540").success(function(response) {
		$scope.product = response;
		$scope.variant = response.variants[0];
	});
}
