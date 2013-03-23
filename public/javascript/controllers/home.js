function HomeCtrl($scope, $http) {
    
    var category = "jackets";
    var brand = "marmot";
    var gender = "mens";
    
      $http.get("/api/products?category=" + category + "&brand=" + brand + "&gender=" + gender).success(function(response) {
        $scope.upperProducts = response;
      });
    
    $(document).ready(function(){
	    $('#upperCarousel, #lowerCarousel').carousel({ interval: false });		
    });
	
	
}
