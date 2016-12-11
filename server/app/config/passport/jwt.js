// Author: DM 2016

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user');
const config = require('../config');

// Setup work and export for the JWT passport strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

module.exports = new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload._id}, '-password', function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});
