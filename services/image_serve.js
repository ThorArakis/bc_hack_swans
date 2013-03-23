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

	var splitUrl = options.url.split('/');
	var fileName = splitUrl[splitUrl.length-2] + "_" + splitUrl[splitUrl.length-1];
	console.log("file name: " + fileName);

	var httpOptions = {
		host: parsedUrl.hostname,
		port: '80',
		path: parsedUrl.pathname
	};

	http.get(httpOptions, function(res) {
		console.log("Got respose: " + res.statusCode);
		res.setEncoding('binary')
		var imagedata = ''
		res.on('data', function(chunk){
			imagedata+= chunk;
		});
		res.on('end', function(){
			fs.writeFile('public/images/cached/new_image.jpg', imagedata, 'binary', callback(null, imagedata));
		});
	}).on('error', function(e) {
		console.log("Error getting the image. Error: " + e.message);
	});

}
