
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { layout: false, title: 'The Outfitter' });
  
   res.render('index.jade', { title: 'The Outfitter' });
};

exports.partials = function(req, res){
	var name = req.params.name;
	res.render('partials/' + name);
};
