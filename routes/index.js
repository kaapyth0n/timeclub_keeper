var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

/* GET home page. */
router.get('/', 
  function(req, res) {
    User.find(function(err, users){
      res.render('index', { users: users, user: req.user, message: '' });
    });
  }
);

module.exports = router;
