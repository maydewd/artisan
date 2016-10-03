'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose');

const jwt = require('./passport/jwt');

/**
 * Expose
 */

module.exports = function (passport) {
  // use these strategies
  passport.use(jwt);
};
