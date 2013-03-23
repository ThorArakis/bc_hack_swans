function HomeCtrl($scope, productService) {
    
  	$scope.upperProducts = productService.getUpperProducts({category : "jacket" , brand: "marmot" , gender : "men"}, function(err, products) {
        if(err) {
            $scope.message = err.message;
        } else {
        	$scope.upperProducts = products;
		}

        //$scope.$apply();
    });
    
//  $(document).ready(function(){
//		$('#upperCarousel, #lowerCarousel').carousel({ interval: false });		
//	});
	
	
}
