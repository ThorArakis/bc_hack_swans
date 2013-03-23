var json = require('./json');

exports.getProduct = function(id, color, callback) {
	json.getJSON('http://hackathon.backcountry.com:8080/hackathon/public/product/' + id, function(err, result) {
		if(!err) {
				var model = { };
				model.title = result.title;
				model.description = result.fullDescription;
				model.features = result.features;
				
				result.skus.forEach(function(sku) {
					if(sku.color == color) {
						model.images = sku.images;
					}
				});
				callback(null, model);
		} else {
			callback(err);
		}
	});
};
