// Author: DM 2016

'use strict';

/*!
 * Module dependencies.
 */

const jwt = require('./passport/jwt');
const fb_token = require('./passport/fb-token');

/**
 * Expose
 */

module.exports = function (passport) {
  // use these strategies
  passport.use(jwt);
  passport.use(fb_token);
};
