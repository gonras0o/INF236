/**
 * Created by blues on 10-09-2016.
 */
var express = require('express');
var router = express.Router();
var user = require('../modules/user');

/* GET home page. */
router.post('/login', function(req, res, next) {
    var locals = {
        title: 'Login | FISW',
        usuario: req.body.user
    };
    res.render('login', locals);
});

router.get('/register', function(req, res, next) {
    var locals = {
        title: 'Register | FISW',
        errors: 0,
        submit: 'not submitted'
    };
    res.render('register', locals);
});

router.post('/register', function(req, res, next) {
    var name = req.body.fname;
    var email = req.body.email;
    var rut = req.body.rut;
    var rol = req.body.rol;
    var password = req.body.password;
    var password2 = req.body.password2;
    var error = 0;


    if (password !== password2){
        error = 1;
    }
    else{
        error = 0;
    }

    //user.checkRut, then user.checkEmail

    var locals = {
        title: 'Register | FISW',
        errors: error,
        submit: 'submitted'
    };

    //if not any errors then user.createUser

    res.render('register', locals);

});

module.exports = router;
