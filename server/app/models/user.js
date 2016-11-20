// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema defines how the user's data will be stored in MongoDB
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {type: String},
  imagePath: {type: String},
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }],
  facebookID: {type: Number, unique: true},
  facebookImagePath: {type: String}
});

// Saves the user's password hashed (plain text password storage is not good)
UserSchema.pre('save', function (next) {
  const user = this;
  if (this.isModified('password') || (this.isNew && typeof this.password !== 'undefined')) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
