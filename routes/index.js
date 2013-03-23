var http = require('http');
var image_serve = require('../services/image_serve');
var search = require('../services/search');
var productService = require('../services/product');
var communityService = require('../services/community');

exports.index = function(req, res){
   res.render('index.jade', { title: 'The Outfitter' });
};

exports.partials = function(req, res){
	var name = req.params.name;
	res.render('partials/' + name);
};

exports.getProducts = function(req, res) {
    var options = req.query;
    if(options.category) {
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

exports.getProduct = function(req, res) {
    if(req.params.id) {
        productService.getProduct(req.params.id, req.query.color, function(err, product) {
            if(!err) {
                res.send(product);
            } else {
                throw err;
            }   
        }); 
    } else {
        throw new Error("Id is required");
    }   
};

exports.getCommunity = function(req, res) {
    if(req.params.id) {
        communityService.getCommunity(req.params.id, function(err, community) {
            if(!err) {
                res.send(community);
            } else {
                throw err;
            }   
        }); 
    } else {
        throw new Error("Id is required");
    }   
};

exports.getImage = function(req, res) {
    var options = req.query;
    console.log(JSON.stringify(options));
    if (options.url){
        image_serve.getImage(options, function(err, stuff_back){
						res.setHeader("Content-Type", "image/jpeg");
						if (typeof(stuff_back == 'string')) console.log('size: ' + stuff_back.length);
						res.end(stuff_back, 'binary');
        }); 
    } 
		else {
			res.send("error");
		}
};
