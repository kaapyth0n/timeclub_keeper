var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: String,
  vkId: String,
  foursquareId: String,
  avatar: String,
  admin: Boolean
});

module.exports = User;
