var express = require('express');
var router = express.Router();

// Modulo de usuarios: acceso a Passport proporcionado
module.exports = function(app, passport) {
	
	// Home GET para todos
	router.get('/', function(req, res, next) {
		var locals = {
		title: 'Homepage | FISW'
		};
		res.render('index', locals);
	});
	
	// Login GET; siempre en Homepage
	
	// Login POST al loguearse desde Homepage
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/encuesta',
		failureRedirect: '/',
	}));

	// Register GET en Homepage
	router.get('/register', function(req, res, next) {
		var locals = {
			title: 'Registro | FISW',
			errors: 0,
			submit: 'not submitted'
		};
		res.render('register', locals);
	});

	// Register POST al completar el registro
	router.post('/register', passport.authenticate('register', {
		successRedirect: '/encuesta',
		failureRedirect: '/',
	}));
	
	// Logout GET desde la navbar
	router.get('/logout', function(req, res)
	{
		req.logout();
		res.redirect('/');
	});
	
	return router;
}

