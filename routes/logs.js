var express = require('express');
var router = express.Router();
var Log = require('../models/log');

router.get('/', function(req, res) {
  Log.find().sort({ when: -1 }).limit(40).populate('user').exec(function(err, logs) {
    res.render('logs', { user: req.user, logs: logs });
  });
})

module.exports = router;
