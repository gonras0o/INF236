var express = require('express');
var router = express.Router();

// My GET: Acceso al portal al hacer login con la encuesta contestada
router.get('/', function(req, res)
{
	if (req.isAuthenticated())
	{
		if (req.user.id_perfil_usuario != 0)
		{
			console.log("My GET exitoso");
			console.log(req.user);
			// Encuesta contestada, perfil definido, todo OK: renderizar perfil
			var locals = 
			{
				title: 'Área personal',
				user : req.user
			};
			res.render('my', locals);
		}
	}
	else
	{
		// No hay login valido; redireccionamiento a Home
		res.redirect('/');
	}
});

// My POST; no debiera haber...
router.post('/', function (req, res, next) {
	/*
	Validar inputs de la encuesta
	Parsear resultados para determinar perfil EDA
	Guardar	resultados encuesta + definir perfil EDA
	SQL exitoso? Redireccionar a perfil
	*/
	console.log(req.body);

	var locals = {
		title: 'Encuesta | FISW',
		errors: 0,
		submit: 'submitted'
	};
	res.render('encuesta', locals);
});

module.exports = router;
