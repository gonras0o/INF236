var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var locals = {
    title: 'Test Folder | FISW'
  };
  res.render('testfolder', locals);
});

module.exports = router;
