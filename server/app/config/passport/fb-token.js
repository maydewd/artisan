const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../../models/user');
const config = require('../config');

const opts = {
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET
};

module.exports = new FacebookTokenStrategy(opts, function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({facebookID: profile.id}, function (error, user) {
    //   return done(error, user);
    // });
  }
);
