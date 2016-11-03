'use strict';

/*
 * Module dependencies.
 */

const express = require('express');
const users = require('../controllers/users');
const listings = require('../controllers/listings');

const upload = require('./multer');

// /**
//  * Route middlewares
//  */

// const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
// const commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {
  const jwtAuth = passport.authenticate('jwt', { session: false });

  // API group router
  var apiRoutes = express.Router();
  app.use('/api', apiRoutes);

  // API AUTH routes
  apiRoutes.post('/login', users.login);
  apiRoutes.post('/register', users.register);
  // apiRoutes.post('/logout', users.logout);

  // API USER routes
  apiRoutes.get('/users', jwtAuth, users.showAll);
  // apiRoutes.get('/users/:userId', users.show);
  // apiRoutes.get('/users/:userId/posts', users.posts);

  // API LISTING routes
  apiRoutes.post('/listings', [jwtAuth, upload.single('image')], listings.create);
  apiRoutes.get('/listings', jwtAuth, listings.showPosts); 
  apiRoutes.get('/listings/me', jwtAuth, listings.showMine);
  apiRoutes.get('/listings/liked', jwtAuth, listings.showLiked);
  apiRoutes.get('/listings/:listingID', jwtAuth, listings.show);
  apiRoutes.post('/listings/:listingID/like', jwtAuth, listings.like);
  apiRoutes.post('/listings/:listingID/unlike', jwtAuth, listings.unlike);




  /**
   * Error handling
   */

  app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
      && (~err.message.indexOf('not found')
      || (~err.message.indexOf('Cast to ObjectId failed')))) {
      return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
      res.status(422).json({status: '422', error: err.stack });
      return;
    }

    // error page
    res.status(500).json({status:'500', error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).json({
      status:'404',
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
