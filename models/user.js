var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: String,
  vkId: String,
  avatar: String
});

module.exports = User;
