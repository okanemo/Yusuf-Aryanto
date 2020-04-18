const { JWT_SECRET_KEY } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendResponse, parsePermissions } = require('../helper');
const { checkEmail, insertUser, selectUserByEmail, selectRoleByID } = require('../models/users');

const loginController = (req, res) => {
  const { email, password } = req.body;
  selectUserByEmail(email).then(async user => {
    if (!user) {
      sendResponse(res, { error: [{ message: 'Email is not registered.' }] });
    }

    const permissions = await selectRoleByID(user.role).then(role => {
      if(role) {
        return parsePermissions(role);
      }
    });

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({
          name: user.name,
          email: user.email,
          role: user.role,
          permissions
        }, JWT_SECRET_KEY, { expiresIn: 60 * 5 });
        sendResponse(res, {
          data: { 
            name: user.name,
            email: user.email,
            token
          }
        });
      } else {
        sendResponse(res, { error: [{ message: 'Password incorrect.' }] });
      }
    });
  }).catch(() => {
    sendResponse(res, { error: [{ message: 'Login failed.' }] });
  });
};

const registerController = (req, res) => {
  const { name, email, password, confirmation_password } = req.body;
  let errors = [];

  if (!name || !email || !password || !confirmation_password) {
    errors.push({ message: 'Please enter all fields.' });
  }

  if (password !== confirmation_password) {
    errors.push({ message: 'Password does not match.' });
  }

  if (password && password.length < 6) {
    errors.push({ message: 'Password must be at least 6 characters.' });
  }

  if (errors.length > 0) {
    sendResponse(res, { error: errors }, 400);
  } else {
    checkEmail(email).then(async check => {
      if (check && check.count === 0) {
        const encryptedPassword = await bcrypt.hash(password, 10).then((pass) => { return pass }).catch((err) => { throw err; });
        insertUser({
          name,
          email,
          password: encryptedPassword,
          role: 2
        }).then(() => {
          sendResponse(res, { message: 'Registration success.' });
        }).catch(() => {
          sendResponse(res, { error: [{ message: 'Registration failed.' }] });
        });
      } else {
        sendResponse(res, { error: [{ message: 'Email already exists.' }] });
      }
    }).catch(() => {
      sendResponse(res, { error: [{ message: 'Registration failed.' }] });
    });
  }
};

module.exports = {
  loginController,
  registerController
};
