function HomeCtrl($scope, $http) {
    
    var category = "jackets";
    var brand = "marmot";
    var gender = "mens";
    
    var category2 = "pants";
    
      $http.get("/api/products?category=" + category + "&brand=" + brand + "&gender=" + gender)
				.success(function(ids) {
			        var details = [];
			        ids.forEach(function(id){                         
                        $http.get("/api/products/"+ id)
                    				.success(function(response) {
                                        this.concat(response); 
                          });
                    }, details);
        	$scope.upperProducts = details;
      });
      
      $http.get("/api/products?category=" + category + "&brand=" + brand + "&gender=" + gender)
  				.success(function(ids) {
  			        var details = [];
                       ids.forEach(function(id){                         
                          $http.get("/api/products/"+ id)
                      				.success(function(response) {                      			     
                                     this.concat(response); 
                            });
                      }, details);
          	$scope.lowerProducts = details;
        });
     
     $scope.brands = [
        { name: 'The North Face' },
        { name: 'Marmot' },
        { name: 'Patagonia' }      
      ];
      
      $scope.categories = [
		{ name: 'Hoodies & Sweatshirts' },
	    { name: 'Snowboard Jackets' },
        { name: 'Snowboard Jackets' },
        { name: 'Bike Jackets' },
        { name: 'Down Jackets' },
        { name: 'Ski Jackets' },
        { name: 'Softshell Jackets' },
        { name: 'Fleece Jackets' },
        { name: 'Casual Jackets' },
        { name: 'Jackets' }
      ];
      
      $scope.genders = [
            { name: 'Men' },
            { name: 'Women' },
            { name: 'Boys' },
            { name: 'Girls' }               
          ];
     
    $scope.colors = [
          { name: 'White' },
          { name: 'Black' },
          { name: 'Blue' },
          { name: 'Green' },
          { name: 'Red' },
          { name: 'Yellow' }                    
    ];
    
    $scope.sizes = [
             { name: 'XS' },
             { name: 'S' },
             { name: 'M' },
             { name: 'L' },
             { name: 'XL' },
             { name: 'XXL' }                    
       ];
    
    $(document).ready(function(){
	    $('#upperCarousel, #lowerCarousel').carousel({ interval: false });		
    });
	
	
}
