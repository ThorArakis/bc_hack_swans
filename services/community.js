var json = require('./json');

exports.getCommunity = function(id, callback) {
	json.getJSON('http://hackathon.backcountry.com:8080/hackathon/public/community/' + id, function(err, result) {
		if(!err) {
				var model = { };
				model.reviews = [];
				var item = { };
				if (result.attributes){
					model.averageReview = result.attributes.avg_review_rank;
					result.attributes.reviews.forEach(function(review) {
						item.title = review.title;
						item.body = review.body;
						item.rank = review.rank;
						if(review.user) {
								item.date = review.user.date_created;
								item.user = review.review_display_name;
								item.employeeStatus = review.user.employee_status;
						}
						model.reviews.push(item);
					});
				}
				callback(null, model);
		} else {
			callback(err);
		}
	});
};
