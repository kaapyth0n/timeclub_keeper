var mongoose = require('mongoose');

var Level = mongoose.model('Level', {
  name: String,
  pricing: Array
});

module.exports = Level;
