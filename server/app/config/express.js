// Author: DM 2016

'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');
const os = require('os');

const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app, passport) {

  // remove powered by express header
  app.disable('x-powered-by');

  // Compression middleware (should be placed before express.static)
  app.use(compression({
    threshold: 512
  }));

  // Static files middleware
  app.use('/public', express.static('public'));

  // Don't log during tests
  // Logging middleware
  if (env !== 'test') {
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(path.join(os.homedir(), 'access.log'), {flags: 'a'})
    app.use(morgan('combined', {stream: accessLogStream}));
  }

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // allows us to take the _method field in a request and use it for the request
  // type (e.g. PUT or DELETE)
  app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // use passport
  app.use(passport.initialize());

  if (env === 'development') {
    app.locals.pretty = true;
  }
};
