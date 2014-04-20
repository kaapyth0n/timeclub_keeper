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

module.exports = router;
