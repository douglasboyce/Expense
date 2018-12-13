const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');

// const db = require('./models');
// Run passport configuration
const passportConfig = require('./authentication');

passportConfig.configurePassport(passport);

const PORT = process.env.PORT || 3306;

const server = express();

// Configure middleware
passportConfig.configureMiddleware(server);
server.use(express.urlencoded({ extended: true }));
server.use(express.json({ limit: '50mb' }));
server.use(express.static('client/dist'));
// server.use(express.bodyParser({ limit: '50mb' }));

const syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

module.exports = {
  passport,
  server,
  PORT,
  syncOptions
}