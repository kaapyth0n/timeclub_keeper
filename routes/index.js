var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', 
  function(req, res) {
    res.render('index', { user: req.user, message: '' });
  }
);

module.exports = router;
