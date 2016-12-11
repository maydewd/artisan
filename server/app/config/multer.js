// Author: DM 2016

const crypto = require('crypto');
const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: 'public/uploads/listings',
  filename: function (req, file, cb) {
    cb(null, crypto.randomBytes(64).toString('hex') + path.extname(file.originalname))
  }
});

var upload = multer({ storage: storage });

module.exports = upload;
