// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

// Schema defines how the ListingSchema's data will be stored in MongoDB
const ListingSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  price: {
    type: Number,
    min: 0,
    required: true
  },
  type: String
});

module.exports = mongoose.model('Listing', ListingSchema);
