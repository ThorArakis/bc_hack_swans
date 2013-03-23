function HomeCtrl($scope, productService) {
    
  	$scope.upperProducts = productService.getUpperProducts({category : "jacket" , brand: "marmot" , gender : "men"}, function(err, products) {
        if(err) {
            $scope.message = err.message;
        } else {
            $location.path('/home');
        }
        $scope.$apply();
    });
    
  	$scope.lowerProducts = [
		{image: 'http://placekitten.com/200/200',text: 'Kitten.'},
		{image: 'http://placekitten.com/225/200',text: 'Kitty!'},
		{image: 'http://placekitten.com/250/200',text: 'Cat.'},
		{image: 'http://placekitten.com/275/200',text: 'Feline!'}
  	];  	
  	$(document).ready(function(){
		$('#upperCarousel, #lowerCarousel').carousel({ interval: false });		
	});
	
	
}
