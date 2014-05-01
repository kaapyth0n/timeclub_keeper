var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Event = require('../models/event');

/* GET home page. */
router.get('/', 
  function(req, res) {
    User.find({ inside: true }, function(err, users){
      Event.find().sort({when: 'asc'}).exec(function(err, events){
        res.render('index', { users: users, user: req.user, events: events, message: '' });
      });
    });
  }
);

module.exports = router;
