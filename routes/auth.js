const { JWT_SECRET_KEY } = process.env;
const express = require('express');
const Router = express.Router();
const jwt = require('jsonwebtoken');

const { sendResponse } = require('../helper');

const { loginController, registerController } = require('../controllers/auth');

Router.get('/login', loginController);

Router.post('/login', loginController);
Router.post('/register', registerController);

Router.get('/verify-token', (req, res) => {
  const { token } = req.query;
  jwt.verify(token, JWT_SECRET_KEY, (err) => {
    if (err) sendResponse(res, { message: 'Invalid token.' }, 401);
  })
  sendResponse(res, { data: { token } });
});

module.exports = Router;
