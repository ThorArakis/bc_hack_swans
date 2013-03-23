var json = require('./json');

exports.getProduct = function(id, color, callback) {
	json.getJSON('http://hackathon.backcountry.com:8080/hackathon/public/product/' + id, function(err, result) {
		if(!err) {
				var model = { };
				model.id = result.id;
				model.title = result.title;
				model.description = result.fullDescription;
				model.bulletPoints = result.bulletPoints;
				model.bottomLine = result.bottomLine;
				model.features = result.features;
				model.variants = [];	
				result.skus.forEach(function(sku) {
					var item = { };
					if(((color && sku.color == color) || !color) && sku.color != "" && sku.images.large != "") {
						item.color = sku.color;
						item.image = sku.images.large;
						item.price = sku.listPrice;
						item.salePrice = sku.salePrice;
						if(!hasMatch(item, model.variants)) model.variants.push(item);
					}
				});
				callback(null, model);
		} else {
			callback(err);
		}
	});
};

function hasMatch(item, variants) {
	var result = false;
	variants.forEach(function(variant) {
		if(variant.color == item.color && variant.image == item.image) result = true;
	});
	return result;
}
