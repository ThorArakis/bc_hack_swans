function HomeCtrl($scope, $http) {
    
    var category = "jackets";
    var brand = "marmot";
    var gender = "mens";
    
    var category2 = "pants";
    
      $http.get("/api/products?category=" + category + "&brand=" + brand + "&gender=" + gender)
				.success(function(response) {
        	$scope.upperProducts = response;
      });
     
      $http.get("/api/products?category=" + category2 + "&brand=" + brand + "&gender=" + gender)
				.success(function(response) {
					$scope.lowerProducts = response;
					
       });
    
    $(document).ready(function(){
	    $('#upperCarousel, #lowerCarousel').carousel({ interval: false });		
    });
	
	
}
