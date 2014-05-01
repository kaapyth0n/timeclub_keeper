var mongoose = require('mongoose');

var Event = mongoose.model('Event', {
  when: { type: Date, default: Date.now },
  description: String
});

module.exports = Event;
