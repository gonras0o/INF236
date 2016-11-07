var LocalStrategy = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
	host:'localhost',
	user:'inf236',
	password:'inf236'
});

connection.query('USE inf236'); // connection.connect() implicito

module.exports = function(passport) {

	// Serialize/Deserialize - Tokens; funcionando?
	passport.serializeUser(function(user, done)
	{
		done(null, user.rut);
	});

	passport.deserializeUser(function(rut, done)
	{
		connection.query("SELECT * FROM usuarios WHERE rut = ?",[rut], function(err, rows)
		{
			done(err, rows[0]);
		});
	});
	
	// Login
	passport.use('login', new LocalStrategy({
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	},
	function(req, email, password, done){
		console.log("Passport Login: req.body");
		console.log(req.body);
		connection.query("SELECT * FROM usuarios WHERE email = ?",[email], function(err, rows) {
			if (err)
				return done(err);
			
			if (!rows.length)
				return done(null, false);
			
			if (!(rows[0].password == password))
				return done(null, false);
			
			return done(null, rows[0]);			
		});
	}));
	
 	// Register
	passport.use('register', new LocalStrategy({
		usernameField:'email',
		passwordField:'password',
		passReqToCallback :true
	},
	function(req, email, password, done){
		console.log("Passport Register: req.body");
		console.log(req.body);
		connection.query("SELECT * FROM usuarios WHERE email = ?",[email], function(err, rows) {
			if (err)
				return done(err);
			
			if (rows.length)
				return done(null, false);
			
			else
			{
				var newUser = new Object();
				
				newUser.nombre = req.body.nombre;
				newUser.rut = req.body.rut;
				newUser.rol = req.body.rol;
				
				// Concatenacion para formar el email completo
				switch(req.body.servidor)
				{
					case "sansano":
						newUser.email = email + "@sansano.usm.cl";
						break;
					case "alumnos":
						newUser.email = email + "@alumnos.usm.cl";
						break;
					case "usm":
						newUser.email = email + "@usm.cl";
						break;
				} 
				
				// Verificacion de contraseña; debiera hacerse en el mismo sitio
				if (password == req.body.password2)
					newUser.password = password;
				else
					newUser.password = password2;
				
				console.log("Passport Register: newUser");
				console.log(newUser);

				var query = "INSERT INTO usuarios VALUES (?, ?, DEFAULT, ?, ?, ?, DEFAULT, DEFAULT)";
				
				connection.query(query, [newUser.rut, newUser.rol, newUser.nombre, newUser.email, newUser.password]);
				
				connection.query("SELECT * FROM usuarios WHERE email = ?",[newUser.email],function(err, rows) {
					return done(null, rows[0]);
				});	
			}
		});
	}));
};