const User = require('../models/user');
const Listing = require('../models/listing');
const mongoose = require('mongoose');

exports.create = function (req, res) {
  filePath = req.file.path || "";
  var newListing = new Listing({
    creator: req.user._id,
    description: req.body.description,
    price: req.body.price,
    type: req.body.type,
    imagePath: filePath
  });

  newListing.save(function(err, listing) {
    if (err) {
      return res.status(400).json({ success: false, message: err});
    }
    req.user.posts.push(listing);
    req.user.save(function(err, user) {
      if (err) {
        return res.status(500).json({ success: false, message: err});
      }
      res.json({
        success: true,
        message: 'Successfully created new listing.',
        listingID: listing._id
      });
    });
  });
}

exports.showAll = function (req, res) {
  var query = {};
  if (req.query.hideMine === 'true') {
    query['creator'] = {$ne: req.user._id};
  }
  Listing.find(query, function(err, listings) {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(listings);
  });
}

exports.showMine = function (req, res) {
  req.user.populate('posts', function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(user.posts);
  });
}

exports.show = function (req, res) {
  Listing.findOne({_id: req.params.listingID}, function(err, listing) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(listing);
  });
}

exports.showLiked = function(req, res) {
  req.user.populate('likes', function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(user.likes);
  });
}

exports.like = function (req, res) {
  var User = req.user;
  if (!User.likes.some((like) => like.equals(req.params.listingID))) { // first time liking
    // update user
    User.likes.push(mongoose.Types.ObjectId(req.params.listingID));
    User.save(function(err, user) {
      if (err) {
        return res.status(500).json({ success: false, message: err});
      }
      // increment number of likes on post by 1
      Listing.findOneAndUpdate({_id: req.params.listingID}, {$inc: {numLikes:1}}, function(err, listing) {
        if (err) {
          return res.status(500).json({ success: false, message: err});
        }
        res.json({
          success: true,
          message: 'Successfully liked post'
        });
      });
    });
  } else {
    return res.status(400).json({ success: false, message: 'User already liked post'});
  }
}
