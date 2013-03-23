var json = require('./json');

exports.performSearch = function(options, callback) {
	var query = "";
	if(options.gender) query += options.gender + " ";
	if(options.brand) query += options.brand + " ";

	if(options.category) {
		query += options.category;
		var products = getProducts("http://hackathon.backcountry.com:8080/hackathon/public/search?q=" + query, function(err, result) {
				if(options.color) {
					getProductsByFacet(result, "Color", options.color, function(err, result) {
						if(!err && result.products) {
							if(options.size) {
								getProductsByFacet(result, "Size", options.size, function(err, result) {
									if(!err && result.products) {
										callback(null, getModels(result.products));
									} else if (!err) {
										callback(null, []);
									} else {
										callback(err);
									}	
								});
							} else {
								callback(null, getModels(result.products));
							}
						} else if (!err) {
							callback(null, []);
						} else {
							callback(err);
						}	
					});	
				} else if (options.size) {
						getProductsByFacet(result, "Size", options.size, function(err, result) {
							if(!err && result.products) {
								callback(null, getModels(result.products));
							} else if (!err) {
								callback(null, []);
							} else {
								callback(err);
							}
						});
				} else {
					callback(null, getModels(result.products));
				}
		});
	} else {
		callback("Must provide category");
	}
}

function getModels(products) {
	var models = new Array();
	products.forEach(function(product) {
		var model = { };
		model.id = product.id;
		model.displayName = product.displayName;
		model.description = product.description;
		model.rating = product.averageReviewRating;
		model.ratingUrl = product.ratingUrl;
		model.image = product.imageLarge.url;
		models.push(model);
	});
	return models;
}

function getProducts(url, callback) {
		console.log("GET " + url);
		json.getJSON(url, function(err, res) {
			callback(err, res);
		});
}

function getProductsByFacet(result, facetName, facetValue, callback) {
	var exists = false;
	result.facets.forEach(function(facet) {
		if(facet.name == facetName) {
			facet.filters.forEach(function(filter) {
				if(filter.name == facetValue) {
					exists = true;
					result = getProducts(filter.url, function(err, result) {
						callback(err, result);
					});
				}
			});
		}
	});

	if(!exists) {
		return callback(null, { });
	}
}
