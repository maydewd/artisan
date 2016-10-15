const Listing = require('../models/listing');

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
    res.json({
      success: true,
      message: 'Successfully created new listing.',
      listingID: listing._id
    });
  });
}

exports.show = function (req, res) {
  Listing.findOne({_id: req.params.listingID}, function(err, listing) {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(listing);
  });
}

exports.showAll = function (req, res) {
  Listing.find({}, function(err, listings) {
    if (err) {
      return res.status(400).send(err);
    }
    res.json(listings);
  });
}
