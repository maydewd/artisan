// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

// Schema defines how the ListingSchema's data will be stored in MongoDB
const ListingSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: {type: String, required: true},
  price: {
    type: Number,
    min: 0,
    required: true
  },
  type: {type: String, required: true},
  imagePath: {type: String, required: true},
  numLikes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Listing', ListingSchema);
