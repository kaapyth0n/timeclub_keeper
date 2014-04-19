var passport = require('passport');
var express = require('express');
var router = express.Router();

// VK login
router.get('/vk',
    passport.authenticate('vkontakte')
);

router.get('/vk/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/error',
        session: true
    })
);

router.get('/4s',
  passport.authenticate('foursquare')
);

router.get('/logout',
  function(req, res) {
    req.session = null;
    res.redirect('/');
  }
);

module.exports = router;
