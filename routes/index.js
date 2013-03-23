
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { layout: false, title: 'The Outfitter' });
  
   res.render('index.jade', { title: 'The Outfitter' });
};