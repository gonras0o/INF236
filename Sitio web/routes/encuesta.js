var express = require('express');
var router = express.Router();

// Encuesta GET: 1) al registrarse, 2) al loguearse sin haber contestado la encuesta
router.get('/', function(req, res) {
	console.log("Encuesta GET");
	console.log(req.user);
	
	if (req.isAuthenticated())
	{
		if (req.user.id_perfil_usuario == 0)
		{
			// Encuesta pendiente, renderizar la encuesta
			var locals = 
			{
				title: 'Encuesta | FISW',
				user : req.user
			};
			res.render('encuesta', locals);
		}
		else
		{
			// Encuesta contestada, perfil definido: redireccionar al portal
			res.redirect('/my');
		}
	}
	else
	{
		// Login incorrecto o se accede al sitio directamente; redireccionamiento forzado
		res.redirect('/');
	}
});

// Encuesta POST, al completar la encuesta
router.post('/', function (req, res, next) {
	console.log("Encuesta POST");
	console.log(req.body.respuestas);

	// Validacion de la encuesta
	// 1) Suma de puntajes por columna EC, OR, CA y EA
	
	respuestas = req.body.respuestas;
	EC_0 = 0;
	OR_1 = 0;
	CA_2 = 0;
	EA_3 = 0;
	
	for (i = 0; i < respuestas.length; i++)
	{
		for (j = 0; j < respuestas[0].length; j++)
		{
			temp = Number(respuestas[i][j]);
			//console.log(temp);
			switch(j)
			{
				case 0:
					EC_0 += temp
					break;
				case 1:
					OR_1 += temp
					break;
				case 2:
					CA_2 += temp
					break;
				case 3:
					EA_3 += temp
					break;
			}
		}
	}
	//console.log(EC_0);
	//console.log(OR_1);
	//console.log(CA_2);
	//console.log(EA_3);
	console.log("Sumatoria: " + EC_0 + OR_1 + CA_2 + EA_3); // Si sumatoria != 120, ya tenemos problemas...
	
	// 2) Resta para puntuaciones finales
	
	CAEC = CA_2 - EC_0;
	EAOR = EA_3 - OR_1;
	//console.log(CAEC);
	//console.log(EAOR);
	
	// 3) Analisis puntuaciones para determinar perfil EDA
	// PDF con ejes "invertidos"; analisis con ejes "naturales"
	// Eje X: EA-OR -> del [-21,5] al [6, 28]
	// Eje Y: CA-EC -> del [-27,3] al [4, 29]
	
	if (EAOR < -21 || EAOR > 28 || CAEC < -27 || CAEC > 29)
	{
		//perfil = "Error";
		perfil = 0;
	}
	else if (EAOR >= 6)
	{
		if (CAEC >= 4)
			//perfil = "Convergente";
			perfil = 1;
		else // CAEC <= 3
			//perfil = "Adaptador";
			perfil = 2;
	}
	else // EAOR <= 5
	{
		if (CAEC >= 4)
			//perfil = "Asimilador";
			perfil = 3;
		else // CAEC <= 3
			//perfil = "Divergente";
			perfil = 4;
	}
	console.log("Perfil: " + perfil);
	
	if (perfil != 0)
	{
		// SQL para actualizar el perfil definido
		var mysql = require('mysql');
		var connection = mysql.createConnection
		({
			host:'localhost',
			user:'root',
			password:'Gtoanp_23_08_1988'
		});
		connection.query('USE inf236');
		
		var query = "UPDATE usuarios SET id_perfil_usuario = ? WHERE rut = ?";
		
		connection.query(query, [perfil, req.user.rut]);
		req.user.id_perfil_usuario = perfil;
		
		// Con la encuesta contestada y el perfil definido, se redirecciona al portal
		res.redirect('/my');
		// Encuesta resuelta con AngularJS; redireccion client-side
	}
	else // perfil == 0; datos de la encuesta invalidos
	/*
	{
		var locals =
		{
			title: 'Encuesta | FISW',
			user : req.user
		};
		res.render('encuesta', locals);
	}
	*/
		res.redirect('/encuesta');
});

module.exports = router;

