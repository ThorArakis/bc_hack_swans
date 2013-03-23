var fs = require('node-fs');
var sys = require('sys');
var http = require('http');
var urllib = require('url');
var exec = require('child_process').exec;

exports.getImage = function(options, callback) {
	var splitUrl = options.url.split('/');
	var fileName = "public/images/cached/" + splitUrl[splitUrl.length-2] + "_" + splitUrl[splitUrl.length-1].split('.')[0] + ".gif";
	console.log("getting: " + fileName)

	fs.exists(fileName, function(exists){
		if (exists){
			getLocalImage(fileName, callback);
		}
		else {
			getRemoteImage(options.url, fileName, callback);
		}
	});
}

var getLocalImage = function(fileName, callback) {
	console.log("reading file: " + fileName);
	fs.readFile(fileName, encoding='binary', callback);
}

var transformImage = function(fileName, callback) {
	console.log("transforming image: " + fileName)
	function puts(error, stdout, stderr) {
		if (error) {
			console.log("error: " + error);
			callback(error, [])
		}
		else {
			getLocalImage(fileName, options.callback);
		}
	}
	var convertCmd = "convert " + fileName  + " -fuzz 10% -transparent white " + fileName;
	var options = {};
	options.callback = callback;
	exec(convertCmd , options, puts);
}

var getRemoteImage = function(url, fileName, callback) {
	console.log("getting url: " + url);
	parsedUrl = urllib.parse(url);
	if (!parsedUrl.hostname || !parsedUrl.pathname){
		console.log("invalid url specified for image!");
	}

	var httpOptions = {
		host: parsedUrl.hostname,
		port: '80',
		path: parsedUrl.pathname
	};

	http.get(httpOptions, function(res) {
		res.setEncoding('binary')
		var imagedata = ''
		res.on('data', function(chunk){
			imagedata+= chunk;
		});
		res.on('end', function(){
			fs.writeFile(fileName, imagedata, 'binary', transformImage(fileName, callback));
		});
	}).on('error', function(e) {
		console.log("Error getting the image. Error: " + e.message);
	});

}
