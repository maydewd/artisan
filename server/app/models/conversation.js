// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

// Schema defines how the ConversationSchema's data will be stored in MongoDB
const ConversationSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Conversation', ConversationSchema);
