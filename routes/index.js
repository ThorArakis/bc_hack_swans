var http = require('http');
var image_serve = require('../services/image_serve');
var search = require('../services/search');

exports.index = function(req, res){
   res.render('index.jade', { title: 'The Outfitter' });
};

exports.partials = function(req, res){
	var name = req.params.name;
	res.render('partials/' + name);
};

exports.getProducts = function(req, res) {
    console.log(JSON.stringify(req.query));
    var options = req.query;
    if(options.category) {
        console.log(JSON.stringify(options));
        search.performSearch(options, function(err, products) {
            if(!err) {
                res.send(products);
            } else {
                console.log("hello")
                throw err;
            }   
        }); 
    } else {
        throw new Error("Category is required for product search");
    }   
};

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
}~ 
