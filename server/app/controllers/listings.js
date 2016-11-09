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
    imagePath: filePath,
    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    locality: req.body.location
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

exports.showPosts = function (req, res) {
  var query = {};
  // Hide own posts?
  if (req.query.hideMine === 'true') {
    query['creator'] = {$ne: req.user._id};
  }
  // Limit max posts?
  var maxPosts = parseInt(req.query.limit) || 10;
  maxPosts = Math.max(0, Math.min(maxPosts, 10));
  // Max distance radius?
  if (!isNaN(parseFloat(req.query.radius))) {
    query['coordinates'] = {
      $near: {
        $geometry: {
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
          type: "Point"
        },
        $maxDistance: parseFloat(req.query.radius)/.00062137 // miles to meters conversion
      }
    }
  }
  // Max cost?
  query['price'] = {$gte: 0} // hack to make sure object is initialized
  if (!isNaN(parseInt(req.query.maxCost))) {
    query['price']['$lte'] = Math.max(parseInt(req.query.maxCost), 0)
  }
  // Min cost?
  if (!isNaN(parseInt(req.query.minCost))) {
    query['price']['$gte'] = Math.max(parseInt(req.query.minCost), 0)
  }
  // Show disliked posts?
  // TODO

  Listing
    .find(query)
    .select('-coordinates')
    .limit(maxPosts)
    .exec(function(err, listings) {
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
  req.user.populate('likes', '-coordinates', function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(user.likes);
  });
}

exports.edit = function (req, res) {
  var User = req.user;
  Listing.findOne({_id: req.params.listingID}, function(err, listing) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!User._id.equals(listing.creator)) {
      return res.status(400).send("You can only edit your own posts");
    }
    // TODO move old image to deleted
    listing.description = req.body.description;
    listing.price = req.body.price;
    listing.type = req.body.type;
    if (req.file) {
      listing.imagePath = req.file.path;
    }
    listing.save(function(err, user) {
      if (err) {
        return res.status(500).json({ success: false, message: err});
      }
      res.json({
        success: true,
        message: 'Successfully edited post'
      });
    });

  });
}

exports.delete = function (req, res) {
  var User = req.user;
  Listing.findOne({_id: req.params.listingID}, function(err, listing) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!User._id.equals(listing.creator)) {
      return res.status(400).send("You can only delete your own posts");
    }
    // TODO move image to deleted
    // TODO remove item from liked posts?
    listing.remove(function(err, user) {
      if (err) {
        return res.status(500).json({ success: false, message: err});
      }
      res.json({
        success: true,
        message: 'Successfully deleted post'
      });
    });
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

exports.unlike = function (req, res) {
  var User = req.user;
  if (User.likes.some((like) => like.equals(req.params.listingID))) { // user has liked previously
    // update user
    User.likes.pull(mongoose.Types.ObjectId(req.params.listingID));
    User.save(function(err, user) {
      if (err) {
        return res.status(500).json({ success: false, message: err});
      }
      // decrement number of likes on post by 1
      Listing.findOneAndUpdate({_id: req.params.listingID}, {$inc: {numLikes:-1}}, function(err, listing) {
        if (err) {
          return res.status(500).json({ success: false, message: err});
        }
        res.json({
          success: true,
          message: 'Successfully unliked post'
        });
      });
    });
  } else {
    return res.status(400).json({ success: false, message: 'User never liked this post'});
  }
}
