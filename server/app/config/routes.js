'use strict';

/*
 * Module dependencies.
 */

const express = require('express');
const users = require('../controllers/users');

// /**
//  * Route middlewares
//  */
//
// const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
// const commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/**
 * Expose routes
 */

module.exports = function (app, passport) {

  // API group router
  var apiRoutes = express.Router();
  app.use('/api', apiRoutes);

  // API USER routes
  apiRoutes.post('/login', users.login);
  apiRoutes.post('/register', users.register);
  // apiRoutes.post('/logout', users.logout);
  apiRoutes.get('/users', passport.authenticate('jwt', { session: false }), users.showAll);
  // apiRoutes.get('/users/:userId', users.show);


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
