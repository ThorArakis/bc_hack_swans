var json = require('./json');

exports.getCommunity = function(id, callback) {
	json.getJSON('http://hackathon.backcountry.com:8080/hackathon/public/community/' + id, function(err, result) {
		if(!err) {
				var model = { };
				model.averageReview = result.attributes.avg_review_rank;
				model.reviews = [];
				result.attributes.reviews.forEach(function(review) {
					var item = { };
					item.title = review.title;
					item.body = review.body;
					item.rank = review.rank;
					item.date = review.user.date_created;
					item.user = review.user.review_display_name;
					item.employeeStatus = review.user.employee_status;
					model.reviews.push(item);
				});
				callback(null, model);
		} else {
			callback(err);
		}
	});
};
