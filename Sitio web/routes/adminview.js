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
             var mysql = require('mysql');
             var aux;
             var aux2;
             var connection = mysql.createConnection
             ({
             host:'localhost',
             user:'root',
             password:'Gtoanp_23_08_1988',
             database: 'inf236'
             });
             connection.connect(function(err) {
             if (err) {
             console.error('error conectando: ' + err.stack);
             return;
             }
             console.log('conectado con ID ' + connection.threadId);
             });

            function final(kaka,aux,aux2)
            {
                console.log("result from db is : ",aux);
                console.log("result from db is : ",aux2);
                var locals =
                {
                    title: 'Área personal',
                    user : req.user,
                    datos1: aux,
                    datos2: aux2
                };
                res.render('adminview', locals);

            }

            function getdata2(las)
            {
                connection.query('SELECT * FROM usuarios WHERE es_moderador=1 AND es_administrador=0' ,function (error, result, fields)
                {
                    if (error)
                        final(err,null,null);
                    //console.log('Total de resultados' + aux.length);
                    //console.log('Total de campos devueltos' + fields.length);
                    var arr = [];
                    for (var i = 0; i < result.length; i++) {
                        //console.log('mail: ', result[i].email);
                        arr.push(result[i].email);
                    }
                    //console.log("arr2:",arr);
                    final(null,las,arr);
                });

            }
            function getdata()
            {
                connection.query('SELECT * FROM usuarios WHERE es_moderador=0 AND es_administrador=0' ,function (error, result, fields)
                {
                    if (error)
                        callback(null);
                    //console.log('Total de resultados' + aux.length);
                    //console.log('Total de campos devueltos' + fields.length);
                    var arr = [];
                    for (var i = 0; i < result.length; i++) {
                        //console.log('mail: ', result[i].email);
                        arr.push(result[i].email);
                    }
                    //console.log("arr:",arr);
                    getdata2(arr);
                });

            }
            getdata();
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
// permisos POST, al selecionar otorgar o quitar permisos
router.post('/', function (req, res, next) {
    console.log("permisos POST");
    console.log(req.body.respuestas);
    var mysql = require('mysql');
    var connection = mysql.createConnection
    ({
        host:'localhost',
        user:'root',
        password:'Gtoanp_23_08_1988'
    });
    connection.query('USE inf236')
    var tos;
    var query = "UPDATE usuarios SET es_moderador = ? WHERE email = ?";
    if(req.body.tipo.includes("quitar"))
    {
        tos=0;
    }
    else
    {
        tos=1;
    }
    connection.query(query, [tos, req.body.respuestas]);
    res.redirect('/adminview');

});
module.exports = router;
