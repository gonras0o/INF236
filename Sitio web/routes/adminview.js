/**
 * Created by gonzalo on 15-11-16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function(req, res)
{
    if (req.isAuthenticated())
    {
        //si no administrador no carga los datos
        if (req.user.es_administrador)
        {

            console.log("adminview!!!!!");
            //console.log(req.user);
            var locals =
            {
                title: 'Área personal',
                user : req.user
            };
            res.render('adminview', locals);
        }
        else
        {
            console.log("NO TIENE LOS PERMISOS");
            res.redirect('/');
        }
    }
    else
    {
        // No hay login valido; redireccionamiento a Home
        res.redirect('/');
    }
});

module.exports = router;
