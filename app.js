var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var VKontakteStrategy = require('passport-vkontakte').Strategy;
var FoursquareStrategy = require('passport-foursquare').Strategy;
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/chaifai');

// models
var User = require('./models/user');

// routes
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var logs = require('./routes/logs');

var app = express();

app.locals.title = 'Чай Фай';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));
require('express-helpers')(app);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cookie-session')({keys: ['a']}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/logs', logs);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// authorization settings
var VKONTAKTE_APP_ID = '4316873';
var VKONTAKTE_APP_SECRET = 'UGvtlYTxfXeql9jEL8uA';

var FOURSQUARE_CLIENT_ID = '3YXAQ5X0R52YNXCT2K0WLDS0O1LX4JEKDBU2YPPIIMUIUYSR';
var FOURSQUARE_CLIENT_SECRET = '5QTWJPGTS2NFLTEC2SRPS2AELIN1N1QBC3HC4EE2Z1QA1BML';

passport.use(new VKontakteStrategy({
    clientID:     VKONTAKTE_APP_ID,
    clientSecret: VKONTAKTE_APP_SECRET,
    callbackURL:  "http://chaifai-105917.euw1-2.nitrousbox.com/auth/vk/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    if (profile && profile.id) {
      User.findOneAndUpdate({ vkId: profile.id }, {
            vkId: profile.id,
            name: profile.displayName,
            avatar: profile._json.photo
        }, { upsert: true }, function (err, user) {
        return done(err, user);
      });
    }
  }
));

passport.use(new FoursquareStrategy({
    clientID: FOURSQUARE_CLIENT_ID,
    clientSecret: FOURSQUARE_CLIENT_SECRET,
    callbackURL:  "http://chaifai-105917.euw1-2.nitrousbox.com/auth/fs/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("fs login success: " + JSON.stringify(JSON.parse(profile._raw).response.user.photo));
    if (profile && profile.id) {
      var photo = JSON.parse(profile._raw).response.user.photo;
      User.findOneAndUpdate({ foursquareId: profile.id }, {
            foursquareId: profile.id,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            avatar: photo.prefix + '64x64' + photo.suffix
        }, { upsert: true }, function (err, user) {
        return done(err, user);
      });
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = app;
