// Author: DM 2016

// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

// Schema defines how the MessageSchema's data will be stored in MongoDB
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: { type: String, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
