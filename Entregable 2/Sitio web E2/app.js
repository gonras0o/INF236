// Requires
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressLayouts=require("express-ejs-layouts")

var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

// startup express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'shared/layout')

// loading resources
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Configuration
require('./config/passport')(passport);

app.use(session({
	secret: 'waffleswaffleswaffleswaffles',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//import modules for managing navigation
var routes = require('./routes/index');
var encuesta = require('./routes/encuesta');
var folder = require('./routes/folder');
var users = require('./routes/users')(app, passport);

var my = require('./routes/my');

app.use('/', routes);
app.use('/encuesta', encuesta);
app.use('/folder', folder);
app.use('/users', users);

app.use('/my', my);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	res.render('error', {
		message: err.message,
		error: err
	});
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
	});
});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	message: err.message,
	error: {}
	});
});

module.exports = {
	app: app,
};