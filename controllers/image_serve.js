var http = require('http');
var image_serve = require('../services/image_serve');

exports.getImage = function(req, res) {
	console.log(JSON.stringify(req.query));
	var options = req.query;
	console.log(JSON.stringify(options));
	if (options.url){
		console.log('calling image');
		image_serve.getImage(options, function(err, stuff_back){
			console.log('call back woo:');
			console.log(stuff_back);
		});
	}
	res.send("nothing yet");
}
