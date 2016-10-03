'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/config');

exports.login = function (req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({ success: false, message: 'Authentication failed.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign(user, config.secret, {
              expiresIn: 10080 // 3 hours in seconds
            });
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send({ success: false, message: 'Authentication failed.' });
          }
        });
      }
    });
  };


/**
 * Create user
 */

exports.register = function (req, res) {
  if(!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({ success: false, message: 'That email address already exists.'});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
};


exports.showAll = function (req, res) {
  User.find({}, 'email', function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
}

// /**
//  *  Show profile
//  */
//
// exports.show = function (req, res) {
//   const user = req.profile;
//   respond(res, 'users/show', {
//     title: user.name,
//     user: user
//   });
// };
