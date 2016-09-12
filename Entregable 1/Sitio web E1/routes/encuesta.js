/**
 * Created by blues on 11-09-2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var locals = {
        title: 'Encuesta | FISW'
    };
    res.render('encuesta', locals);
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    //falta validar los inputs

    var locals = {
        title: 'Encuesta | FISW',
        errors: 0,
        submit: 'submitted'
    };
    res.render('encuesta', locals);

});

module.exports = router;
