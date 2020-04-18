const express = require('express');
const Router = express.Router();

const auth = require('./auth');
const users = require('./users');

Router.use('/auth', auth);
Router.use('/users', users);

module.exports = Router;
