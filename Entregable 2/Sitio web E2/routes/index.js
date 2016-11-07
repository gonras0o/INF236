var express = require('express');
var router = express.Router();

// Homepage GET
router.get('/', function(req, res, next)
{
	if (req.isAuthenticated())
	{
		// Login activo; redirigir a donde corresponda
		res.redirect("/encuesta");
	}
	else
	{
		var locals =
		{
			title: 'Homepage | FISW'
		};
		res.render('index', locals);
	}
});

module.exports = router;
