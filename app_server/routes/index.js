var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main')

/* GET home page. */
router.get('/', ctrlMain.angularApp);
//router.get('/', ctrlMain.index);
//router.get('/bus', ctrlMain.busInfo);

module.exports = router;