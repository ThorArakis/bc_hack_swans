var http = require('http');

exports.getJSON = function(url, callback) {
        http.get(url, function(res) {
                var json = "";
                res.on('data', function(data) {
                        json += data;
                });
                res.on('end', function() {
                        var obj = JSON.parse(json);
			callback(null, obj);
                });
        }).on('error', function(e) {
		callback(e);
        });
};



