'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//const upload = require('multer')();

const pkg = require('../../../package.json');

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
  // app.use(express.static(config.root + '/public'));

  // Don't log during tests
  // Logging middleware
  // if (env !== 'test') app.use(morgan(log));

  // expose package.json to views
  app.use(function (req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // bodyParser should be above methodOverride
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(upload.single('image')); this should go in specific route expecting an image

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