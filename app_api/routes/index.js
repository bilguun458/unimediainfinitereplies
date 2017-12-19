var express = require('express');
var router = express.Router();
var ctrlComments = require('../controllers/bus');

/* Transports pages */
//router.get('/locations/:myId', ctrlLocations.locationsCreate);
router.get('/rootcomments', ctrlComments.rootCommentsRead);
router.get('/childcomments/:com_id', ctrlComments.childCommentRead);
router.post('/comment/:data/:author/:parent_id', ctrlComments.addReply);
router.post('/comment/:data/:author', ctrlComments.addRootComment);
//router.put('/transport/:bus_id/mistake', ctrlComments.transportUpdateMistake);
//router.get('/location', ctrlLocations.locationInfo);
//router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
//router.get('/about', ctrlOthers.about);

module.exports = router;