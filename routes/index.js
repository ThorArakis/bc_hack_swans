
search = require('../services/search');

exports.index = function(req, res){
  //res.render('index', { layout: false, title: 'The Outfitter' });
  
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
~ 
