app.service("productService", function($rootScope) {
    var self = this;
    
    this.getUpperProducts = function(category, brand, gender, callback) {
        //TODO ADD UPPER KEYWORDS
        $.ajax({
            type: "get",
            url: "api/products?category=" + category + "&brand=" + brand + "&gender=" + gender,
            statusCode: {
                    404: function(xhr) {
                        callback(new Error("There are no products for this search"));
                    }
                },
            success: function(products) {
                    if(typeof(callback) == "function") callback(null, products);
            }
        });
    };
});
