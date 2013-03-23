var fs = require('node-fs');
var http = require('http');
var urllib = require('url');
var exec = require('child_process').exec;

exports.getImage = function(options, callback) {
	console.log("getting url: " + options.url);
	parsedUrl = urllib.parse(options.url);
	if (!parsedUrl.hostname || !parsedUrl.pathname){
		console.log("invalid url specified for image!");
	}

	var http_options = {
		host: parsedUrl.hostname,
		port: '80',
		path: parsedUrl.pathname
	};


	http.get(http_options, function(res) {
		console.log("Got respose: " + res.statusCode);
	}).on('error', function(e) {
		console.log("Error getting the image. Error: " + e.message);
	});

	if(options.category) {
			console.log('foo');
			callback("not sure why this is here");
	} else {
			console.log('bar');
		callback("Must provide category");
	}
}
