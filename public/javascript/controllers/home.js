function HomeCtrl($scope, $http) {
    
   
  $scope.upperProduct;
	$scope.upperVariant;
	$scope.lowerProduct;
	$scope.lowerVariant;
	$scope.upperProductIndex = 0;
	$scope.upperVariantIndex = 0;
	$scope.upperCommunity;
	$scope.lowerCommunity;
    

		//Upper carousel
     $scope.upperGo = function() {
				var first=true;
				$scope.upperProducts = [];
				$scope.upperVariants = [];
			 var query = '/api/products?category=' + $scope.upperCategory;
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
																			}, 20);
																		first=false;
																	}
																});
                          });
                    });
      });
    }
    
    $scope.lowerGo = function() {  
			var first=true;
			$scope.lowerProducts = [];
			$scope.lowerVariants = [];
			 var query = '/api/products?category=' + $scope.lowerCategory;
			 if ($scope.lowerBrand) query += ("&brand=" + $scope.lowerBrand);
			 if ($scope.lowerGender) query += ("&gender=" + $scope.lowerGender);
			 if ($scope.lowerColor) query += ("&color=" + $scope.lowerColor);
			 if ($scope.lowerSize) query += ("&size=" + $scope.lowerSize);
      $http.get(query)
  				.success(function(ids) {
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
																			}, 20);
																		first=false;
																	}
																});
                            });
                      }, details);
          	$scope.lowerProducts = details;
        });
   }
     
     $scope.brands = [
        { name: 'The North Face' },
        { name: 'Marmot' },
        { name: 'Patagonia' }      
      ];
      
      $scope.upperCategories = [
				{ name: 'Hoodies & Sweatshirts' },
        { name: 'Snowboard Jackets' },
        { name: 'Bike Jackets' },
        { name: 'Down Jackets' },
        { name: 'Ski Jackets' },
        { name: 'Softshell Jackets' },
        { name: 'Fleece Jackets' },
        { name: 'Casual Jackets' },
        { name: 'Jackets' }
      ];
      
      $scope.lowerCategories = [
				{ name: 'Snowboard Pants' },
        { name: 'Ski Pants' },
        { name: 'Biking Pants' },
        { name: 'Softshell Pants' },
        { name: 'Shell Pants' },
        { name: 'Casual Pants' },
				{ name: 'Under Pants' },
        { name: 'Pants' }
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
		});

		
	    $('#upperCarousel, #lowerCarousel').bind('slide', function(e) { 
			if(e.direction == "left") {
				if($scope.upperProduct) {
					if($scope.upperProduct.variants.length > $scope.upperVariantIndex + 1) {
						$scope.upperVariantIndex++;
						$scope.variant = $scope.upperProduct.variants[$scope.upperVariantIndex];
					} else if ($scope.upperProducts.length > $scope.upperProductIndex + 1) {
						$scope.upperProductIndex++;
						$scope.upperVariantIndex = 0;
						$scope.variant = $scope.upperProduct.variants[$scope.upperVariantIndex];
						$scope.upperProduct = $scope.upperProducts[$scope.upperProductIndex];
    					$http.get("/api/products/" + $scope.upperProduct.id + "/reviews").success(function(response) {
							$scope.upperCommunity = response;
						});
					} else {
						$scope.upperProductIndex = 0;
						$scope.upperVariantIndex = 0;
						$scope.upperProduct = $scope.upperProducts[$scope.upperProductIndex];
						$scope.upperVariant = $scope.upperProduct.variants[$scope.upperVariantIndex];
    					$http.get("/api/products/" + $scope.upperProduct.id + "/reviews").success(function(response) {
							$scope.upperCommunity = response;
						});
					}
				} else {
					$scope.upperProduct = $scope.upperProducts[$scope.upperProductIndex];
					$scope.upperVariant = $scope.upperProduct.variants[$scope.upperVariantIndex];
    					$http.get("/api/products/" + $scope.upperProduct.id + "/reviews").success(function(response) {
							$scope.upperCommunity = response;
						});
				}
			} else if(e.direction == "right") {
				if($scope.upperProduct) {
					if($scope.upperVariantIndex - 1 >= 0) {
						$scope.upperVariantIndex--;
						$scope.upperVariant = $scope.upperProduct.variants[$scope.upperVariantIndex];
					} else if ($scope.upperProductIndex - 1 >= 0) {
						$scope.upperProductIndex--;
						$scope.upperProduct = $scope.upperProducts[$scope.upperProductIndex];
						$scope.upperVariantIndex = $scope.upperProduct.variants.length - 1;
						$scope.upperVariant = $scope.upperProduct.variants[$scope.upperVariantIndex];
    					$http.get("/api/products/" + $scope.upperProduct.id + "/reviews").success(function(response) {
							$scope.upperCommunity = response;
						});
					} else {
						$scope.upperProductIndex = $scope.upperProducts.length - 1;
						$scope.upperProduct = $scope.upperProducts[$scope.upperProductIndex];
						$scope.upperVariantIndex = $scope.upperProduct.variants.length - 1; 
						$scope.upperVariant = $scope.upperProduct.variants[$scope.upperVariantIndex];
    					$http.get("/api/products/" + $scope.upperProduct.id + "/reviews").success(function(response) {
							$scope.upperCommunity = response;
						});
					}
				} else if ($scope.upperProducts) {
					$scope.upperProduct = $scope.upperProducts[$scope.upperProductIndex];
					$scope.upperVariant = $scope.upperProduct.variants[$scope.upperVariantIndex];
						$http.get("/api/products/" + $scope.upperProduct.id + "/reviews").success(function(response) {
							$scope.upperCommunity = response;
						});
				}
			}
			$scope.$apply();
		});
    });
	
	
}
