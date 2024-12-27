const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // TTL of 24 hours (86400 seconds)
  }
});

module.exports = mongoose.model('Blacklist', blacklistSchema);