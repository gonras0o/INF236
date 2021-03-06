var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressLayouts=require("express-ejs-layouts")
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mysql = require('mysql');

//import modules for managing navigation
var routes = require('./routes/index');
var users = require('./routes/users');
var encuesta = require('./routes/encuesta');

//startup express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'shared/layout')

//loading resources
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//redirects request to be handled by their correspondent js files
app.use('/', routes);
app.use('/users', users);
app.use('/encuesta', encuesta);

//Creates connection to database
var db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'fisw',
  port: 3306
});

//Connects to database and checks if errors
db.connect(function(error){
  if(!!error){
    console.log('Error on connecting database');
  }
  else{
    console.log('Database connected successfully');
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
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

app.use(flash());


module.exports = {
  app: app,
  db: db
};