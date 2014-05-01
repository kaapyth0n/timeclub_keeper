var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Event = require('../models/event');
var Level = require('../models/level');

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

/* Levels */
router.get('/levels', function(req, res) {
  if (req.user && req.user.admin) {
    Level.find(function(err, levels) {
      res.render('levels', { user: req.user, levels: levels });
    });
  }
});

router.post('/levels/add', function(req, res) {
  if (req.user && req.user.admin) {
    Level.create({ name: req.param('name'), pricing: req.param('pricing').split(',') }, function(err) {
      res.redirect('/levels');
    });
  }
});

router.get('/levels/delete/:id', function(req, res) {
  if (req.user && req.user.admin) {
    Level.findByIdAndRemove(req.params.id, function(err) {
      res.redirect('/levels');
    });
  }
});

module.exports = router;
