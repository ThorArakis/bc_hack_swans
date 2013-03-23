function HomeCtrl($scope, $http) {
    
   
    $scope.upperProduct;
	$scope.upperVariant;
	$scope.lowerProduct;
	$scope.lowerVariant;
	$scope.productIndex = 0;
	$scope.variantIndex = 0;

    $http.get("/api/products/MAR1534/reviews").success(function(response) {
        $scope.community = response;
    }); 
    
		$scope.upperProducts = [];
		$scope.upperVariants = [];
		$scope.lowerProducts = [];
		$scope.lowerVariants = [];
		var first=true;

     $scope.upperGo = function() {
			 console.log('brand: ' + $scope.upperBrand);
			 console.log('gender: ' + $scope.upperGender);
			 query = '/api/products?category=' + $scope.upperCategory;
			 if ($scope.upperBrand) query += ("&brand=" + $scope.upperBrand);
			 if ($scope.upperGender) query += ("&gender=" + $scope.upperGender);
			 if ($scope.upperColor) query += ("&color=" + $scope.upperColor);
			 if ($scope.upperSize) query += ("&size=" + $scope.upperSize);
      $http.get(query)
				.success(function(ids) {
							console.log('foo');
			        ids.forEach(function(id){
                        $http.get("/api/products/"+ id)
                    				.success(function(response) {
															$scope.upperProducts.push(response);
															response.variants.forEach(function(variant){
																	$scope.upperVariants.push(variant);
																	if(first) {
																		setTimeout(function(){
																			$('#upperCarousel').carousel('next');
																			console.log('NEXT!!@!!');
																			}, 20);
																		first=false;
																	}
																});
                          });
                    });
      });
    }
    
    $scope.lowerGo = function() {  
      $http.get("/api/products?category=" + $scope.lowerCategory + "&brand=" + $scope.lowerBrand + "&gender=" + $scope.lowerGender + "&color=" + $scope.lowerColor + "&size=" + $scope.lowerSize)
  				.success(function(ids) {
						console.log('hey');
  			        var details = [];
                       ids.forEach(function(id){                         
                          $http.get("/api/products/"+ id)
                      				.success(function(response) {
															$scope.lowerProducts.push(response);
															response.variants.forEach(function(variant){
																	$scope.lowerVariants.push(variant);
																	if(first) {
																		setTimeout(function(){
																			$('#lowerCarousel').carousel('next');
																			console.log('NEXT!!@!!');
																			}, 20);
																		first=false;
																	}
																});
                            });
                      }, details);
          	$scope.lowerProducts = details;
						console.log('yeah');
        });
   }
     
     $scope.brandList = [
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
	    $('#upperCarousel, #lowerCarousel').carousel({ 
				interval: false,
				slid: function(e) {
					alert('hi');
					alert(e);
					if($scope.product.variants.length > $scope.variantIndex + 1) {
						$scope.variantIndex++;
						$scope.variant = $scope.product.variants[$scope.variantIndex];
					} else if ($scope.products.length > $scope.productIndex + 1)  {
						$scope.productIndex++;
						$scope.product = $scope.products[$scope.productIndex ];
						$scope.variant = $scope.product.variants[0];
					}
				}
		});
    });
	
	
}
