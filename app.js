var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var uglifyJs = require("uglify-js");
var fs = require('fs');

//var index = require('./app_server/routes/index');

var appApi = require('./app_api/routes/index'); // routes for API


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
var appClientFiles = [
	'app_client/app.js',
	'app_client/common/services/baitsaagchData.service.js',
	'app_client/common/services/myGlobalVars.service.js',
	'app_client/home/home.controller.js',
	'app_client/transport/transport.controller.js',
	'app_client/home/locSelect.controller.js',
 	'app_client/help/help.controller.js',
	'common/directives/footerGeneric/footerGeneric.directive.js',
	'common/directives/navigation/navigation.directive.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress : false });
/*fs.writeFile('public/angular/baitsaagch.min.js', uglified.code, function (err){
	if(err) {
		console.log(err);
	} else {
		console.log('Script generated and saved: baitsaagch.min.js');
	}
});*/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use('/api', appApi); // starting path for API routes
app.use(function(req, res) {
	res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

//app.use('/', index);
app.use('/api', appApi); // starting path for API routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
