var passport = require('passport');
var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

// VK login
router.get('/vk',
    passport.authenticate('vkontakte')
);

router.get('/vk/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/error',
    })
);

router.get('/link/vk',
    passport.authorize('vk-authorize'),
    function(req, res) {
      if (req.user) {
        User.findOne({ vkId: req.account.vkId }, function(err, user) {
          
        });
      }
    }
);

// Fourquare login
router.get('/fs',
  passport.authenticate('foursquare')
);

router.get('/fs/callback',
    passport.authenticate('foursquare', {
        successRedirect: '/',
        failureRedirect: '/error',
    })
);

router.get('/logout',
  function(req, res) {
    req.session = null;
    res.redirect('/');
  }
);

module.exports = router;
