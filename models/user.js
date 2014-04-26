var mongoose = require('mongoose');
var Log = require('./log');

var userSchema = new mongoose.Schema({
  name: String,
  vkId: String,
  foursquareId: String,
  avatar: String,
  admin: Boolean,
  inside: Boolean
});

userSchema.methods.checkin = function(callback) {
  var user = this;
  this.update({ $set: { inside: true } }, function(err, doc) {
    if (!err) Log.create({ user: user._id, action: 'checkin' });
    callback(err);
  });
};

userSchema.methods.checkout = function(callback) {
  var user = this;
  this.update({ $set: { inside: false } }, function(err, doc) {
    if (!err) Log.create({ user: user._id, action: 'checkout' });
    callback(err);
  });
};

module.exports = mongoose.model('User', userSchema);
