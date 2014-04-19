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
    })
);

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
