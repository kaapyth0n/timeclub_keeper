var mongoose = require('mongoose');

var Log = mongoose.model('Log', {
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  when: { type: Date, default: Date.now },
  action: String // 'checkin' or 'checkout'
});

module.exports = Log;
