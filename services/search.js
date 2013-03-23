var json = require('./json');

exports.performSearch = function(options, callback) {
	var query = "";
	if(options.gender) query += options.gender + " ";
	if(options.brand) query += options.brand + " ";

	if(options.category) {
		query += options.category;
		json.getJSON("http://hackathon.backcountry.com:8080/hackathon/public/search?q=" + query, function(err, res) {
			//filter by size and color
			callback(err, res);
		});
	} else {
		callback("Must provide category");
	}
}
