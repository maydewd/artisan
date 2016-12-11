// Author: DM 2016

const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('../../models/user');
const config = require('../config');

const opts = {
  clientID: "1765555777026246",
  clientSecret: "1ce82eb411fda5fad5eabffee3b1fe17"
};

module.exports = new FacebookTokenStrategy(opts, function(accessToken, refreshToken, profile, done) {
    User.findOne({facebookID: profile.id}, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else { // create new user
        var newUser = new User({
          username: profile.emails[0]['value'],
          facebookID: profile.id,
          facebookImagePath: profile.photos[0]['value']
        });
        // Attempt to save the user
        newUser.save(function(err, user) {
          if (err) {
            done(err, false);
          }
          done(null, user);
        });
      }
    });
  }
);
