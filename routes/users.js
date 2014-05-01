var express = require('express');
var User = require('../models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  var show = req.param('show');
  if ( !show || show == 'all') {
    User.find().sort({admin: -1, name: 1}).exec(function(err, users) {
      res.render('users/users', { user: req.user, users: users, show: 'all' });
    });
  } else if (show == 'admins') {
    User.find({ admin: true }).sort({ name: 1 }).exec(function(err, users) {
      res.render('users/users', { user: req.user, users: users, show: 'admins' });
    });
  } else if (show == 'inside') {
    User.find({ inside: true }).sort({ name: 1 }).exec(function(err, users) {
      res.render('users/users', { user: req.user, users: users, show: 'inside' });
    });
  } else if (show == 'find') {
    res.render('users/user_find', { user: req.user, show: 'find' });
  } else if (show == 'create') {
    res.render('users/user_create', { user: req.user, show: 'create' });
  }
});

router.post('/', function(req, res) {
    var show = req.param('show');
    if ( !show || show == 'all') {
        User.find().sort({admin: -1, name: 1}).exec(function(err, users) {
            res.render('users/users', { user: req.user, users: users, show: 'all' });
        });
    } else if (show == 'find') {
        var name = req.param('name');
        var card = req.param('card');

        User.find({ name: name }).sort({ card: card }).exec(function(err, users) {
            res.render('users/users', { user: req.user, users: users, show: 'all' });
        });
    } else if (show == 'create') {
        var name = req.param('name');
        var card = req.param('card');

        User({
            name: name,
            admin: false,
            card: card
        }).save(function(err, users) {
            res.redirect('/users?show=all')
        });
    }
});


router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.redirect('/404');
    else res.render('profile', { profile: user, user: req.user });
  });
});

router.get('/:action/:id', function(req, res) {
  if (req.user) {
    var action = req.params.action;
    var id = req.params.id;
    var callback = function(req, res) {
      res.redirect('/users');
    };
    if (action == 'grant_admin' && req.user.admin) {
      User.findByIdAndUpdate(id, { $set: { admin: true } }, function(err) {
        callback(req, res);
      });
    } else if (action == 'revoke_admin' && req.user.admin) {
      User.findByIdAndUpdate(id, { $set: { admin: false } }, function(err) {
        callback(req, res);
      });
    } else if (action == 'checkin' && (req.user.admin || req.params.id == req.user._id)) {
      User.findById(req.params.id, function(err, user) {
        if (user) user.checkin(function(err) {
          callback(req, res);
        });
        else res.send(500);
      });
    } else if (action == 'checkout' && (req.user.admin || req.params.id == req.user._id)) {
      User.findById(req.params.id, function(err, user) {
        if (user) user.checkout(function(err) {
          callback(req, res);
        });
        else res.send(500);
      });
    } else if (action == 'delete' && req.user.admin) {
      User.remove(id, function(err, user){
        res.status(err ? 500 : 200);
        });
      
    }
  }
});

module.exports = router;
