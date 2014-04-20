var express = require('express');
var User = require('../models/user');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  User.find().sort({admin: -1, name: 1}).exec(function(err, users) {
    res.render('users', { user: req.user, users: users });
  });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) res.redirect('/404');
    else res.render('profile', { profile: user, user: req.user });
  });
});

router.get('/:action/:id', function(req, res) {
  if (req.user && req.user.admin) {
    var action = req.params.action;
    var id = req.params.id;
    var callback = function(req, res) {
      res.redirect('/users');
    };
    if (action == 'grant_admin') {
      console.log('grant admin role to ' + id);
      User.findByIdAndUpdate(id, { $set: { admin: true } }, function(err) {
        callback(req, res);
      });
    } else if (action == 'revoke_admin') {
      console.log('revoke admin role from ' + id);
      User.findByIdAndUpdate(id, { $set: { admin: false } }, function(err) {
        callback(req, res);
      });
    }
  }
});
  

module.exports = router;
