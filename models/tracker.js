const mongoose = require('mongoose');
//const shortID = require('shortid');
// shortID.generate()
const tracks = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  logs: [{
    description: String,
    duration: Number,
    date: Date,
  }]
})
module.exports = mongoose.model('user', tracks)