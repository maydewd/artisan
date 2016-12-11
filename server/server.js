// Author: DM 2016

// server.js
'use strict'

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require('./app/config/config'); // get our config file
const mongoose = require('mongoose');

var app      = express();
var port     = process.env.PORT || 3000;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use morgan to log requests to the console
// app.use(morgan('dev'));

require('./app/config/passport')(passport);
require('./app/config/express')(app, passport);
require('./app/config/routes')(app, passport);

// =======================
// start the server ======
// =======================

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen () {
  app.listen(port);
  console.log('Express app started on port ' + port);
}

function connect () {
  return mongoose.connect(config.database).connection;
}

module.exports = app; // for testing
