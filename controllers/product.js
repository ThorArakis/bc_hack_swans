var search = require('../services/search');

exports.getProducts = function(req, res) {
	console.log(JSON.stringify(req.query));
	var options = req.query;
	if(options.category) {
		console.log(JSON.stringify(options));
		search.performSearch(options, function(err, products) {
			if(!err) {
				res.send(products);
			} else {
				throw err;
			}
		});
	} else {
		throw new Error("Category is required for product search");
	}
};
