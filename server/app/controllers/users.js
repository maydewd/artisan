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
    User.findOne({username: req.body.username.toLowerCase()}, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(401).send({ success: false, message: 'Authentication failed.' });
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            var token = jwt.sign({_id:user._id.toString()}, config.secret, {
              expiresIn: 10080 // 3 hours in seconds
            });
            var filteredUser = {_id: user.id, username: user.username, imagePath:user.imagePath, facebookImagePath: user.facebookImagePath}
            res.json({ success: true, token: 'JWT ' + token, user: filteredUser });
          } else {
            res.status(401).send({ success: false, message: 'Authentication failed.' });
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

exports.loginFB = function (req, res) {
  var token = jwt.sign({_id:req.user._id.toString()}, config.secret, {
    expiresIn: 10080 // 3 hours in seconds
  });
  res.json({ success: true, token: 'JWT ' + token, user: req.user });
}

exports.linkFB = function (req, res) {
  // MERGE THE TWO USERS req.user and req.account
  if (req.user._id === req.user._id) {
    res.status(400).send.json({ success: false, message: 'Accounts already linked' });
  } else if (req.user.password == null) {
    res.status(400).send.json({ success: false, message: 'Must be logged in using local username and password' });
  } else if (req.user.facebookID !== null) {
    res.status(400).send.json({ success: false, message: 'Local account already linked with a Facebook account' });
  } else { // can merge users
    User.update(req.user,
      {
        $set: {facebookID: req.account.facebookID, facebookImagePath: req.account.facebookImagePath},
        $addToSet: { posts: { $each: req.account.posts }, likes: { $each: req.account.likes } }
      }, function(err, user) {
        if (err) {
          return res.status(400).send(err);
        }
        req.account.remove(function(err, user) {
          if (err) {
            return res.status(400).send(err);
          }
          res.json({ success: true, message: 'Accounts successfully linked' });
        });
      }
    );
  }
}

exports.editProfile = function (req, res) {
  var User = req.user;
  if (req.body.username) {
    User.username = req.body.username
  }
  if (req.body.password) {
    User.password = req.body.password
  }
  if (req.file) {
    User.imagePath = req.file.path;
  }
  User.save(function(err) {
    if (err) {
      return res.status(400).json({ success: false, message: err});
    }
    res.json({ success: true, message: 'Successfully updated user.' });
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
