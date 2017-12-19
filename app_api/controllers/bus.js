var mongoose = require('mongoose');
var commentsModel = mongoose.model('Comments');

//placeholder funcs
var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//root commentuud butsaaah function
module.exports.rootCommentsRead = function(req, res) {
	commentsModel
	.find( {"parentId" : null} )
	.select('-parentId')
	.exec(function(err, comment) {
		if (!comment) {
			sendJsonResponse(res, 404, {
				"message": "comments not found"
			});
			return;
		} else if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}
		sendJsonResponse(res, 200, comment);
	});
};
function addReplies(parent_id) {
	commentsModel
	.find( {"parentId" : parent_id} )
	.exec(function(err, comment) {
		if (!comment) {
			return;
		} else if (err) {
			return;
		}
		if (comment.length > 0) {
			for (var i = 0; i < comment.length; i++)
			{
				comment[i].replies = addReplies(comment[i]._id);
			}
		}
		//console.log(comment);
		return comment;
	});
}
module.exports.commentsRead = function(req, res) {
	commentsModel
	.find( {"parentId" : null} )
	.exec(function(err, comment) {
		if (!comment) {
			sendJsonResponse(res, 404, {
				"message": "comments not found"
			});
			return;
		} else if (err) {
			sendJsonResponse(res, 404, err);
			return;
		}
		for (var i = 0; i < comment.length; i++)
		{
			comment[i].replies = addReplies(comment[i]._id);
			console.log(addReplies(comment[i]._id));
			//if (i == comment.length - 1) x = true;
		}
		sendJsonResponse(res, 200, comment);
	});
};

//child comment буцаах GET хүсэлт
module.exports.childCommentRead = function(req, res) {
	if (req.params && req.params.com_id) {
		commentsModel
		.find( {"parentId" : req.params.com_id} )
		.exec(function(err, comment) {
			if (!comment) {
				sendJsonResponse(res, 404, {
					"message": "comments not found"
				});
				return;
			} else if (err) {
				sendJsonResponse(res, 404, err);
				return;
			}
			sendJsonResponse(res, 200, comment);
		});
	} else {
		sendJsonResponse(res, 404, {
			"message": "No comment_id date in request"
		});
	}
};
//post huseltiin hariud reply bichij response butsaana
module.exports.addReply = function(req, res) {
	if (req.params && req.params.data && req.params.author && req.params.parent_id) {
		commentsModel
		.create({
			parentId: req.params.parent_id,
			date: Date.now(),
			author: req.params.author,
			data: req.params.data,
			replies: null
		}, function(err, comment) {
		if (err) {
		sendJsonResponse(res, 400, err);
		} else {
		sendJsonResponse(res, 201, comment);
		}

		});
	}
};
//post huseltiin hariud root comment bichij response butsaana
module.exports.addRootComment = function(req, res) {
	if (req.params && req.params.data && req.params.author) {
		commentsModel
		.create({
			parentId: null,
			date: Date.now(),
			author: req.params.author,
			data: req.params.data,
			replies: null
		}, function(err, comment) {
		if (err) {
		sendJsonResponse(res, 400, err);
		} else {
		sendJsonResponse(res, 201, comment);
		}

		});
	}
};