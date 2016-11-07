'use strict';

/**
 * Module dependencies.
 */

const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config/config');

exports.login = function (req, res) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({ success: false, message: 'Please enter username and password.' });
  } else {
    User.findOne({
      username: req.body.username.toLowerCase()
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(400).send({ success: false, message: 'Authentication failed.' });
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
  }
};


/**
 * Create user
 */

exports.register = function (req, res) {
  if(!req.body.username || !req.body.password || !req.file) {
    return res.status(400).json({ success: false, message: 'Please enter username and password and image.' });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      imagePath: req.file.path
    });

    // Attempt to save the user
    newUser.save(function(err) {
      if (err) {
        return res.status(400).json({ success: false, message: err});
      }
      res.json({ success: true, message: 'Successfully created new user.' });
    });
  }
};


exports.showAll = function (req, res) {
  User.find({}, 'username', function(err, users) {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(users);
  });
}

exports.showMe = function (req, res) {
  res.json(req.user);
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
