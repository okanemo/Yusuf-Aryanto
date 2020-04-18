const bcrypt = require('bcryptjs');
const { sendResponse } = require('../helper');
const {
  checkEmail,
  insertUser,
  selectAllUser,
  selectUserByID,
  updateUser,
  deleteUser
} = require('../models/users');

const getAllUserController = async (req, res) => {
  await selectAllUser().then(data => {
    sendResponse(res, { data });
  }).catch(() => {
    sendResponse(res, { error: 'GET user failed.' });
  });
};

const getUserByIDController = async (req, res) => {
  const { id } = req.params;
  await selectUserByID(id).then(user => {
    const data = user ? { id: user.id, name: user.name, email: user.email, role: user.role } : undefined;
    sendResponse(res, { data });
  }).catch(() => {
    sendResponse(res, { error: 'GET user failed.' });
  });
};

const postUserController = async (req, res) => {
  const { name, email, password, confirmation_password, role } = req.body;
  let errors = [];

  if (!name || !email || !password || !confirmation_password || !role) {
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
          role
        }).then(() => {
          sendResponse(res, { message: 'User created successfully.' });
        }).catch(() => {
          sendResponse(res, { error: [{ message: 'POST user failed.' }] });
        });
      } else {
        sendResponse(res, { error: [{ message: 'Email already exists.' }] });
      }
    }).catch(() => {
      sendResponse(res, { error: [{ message: 'POST user failed.' }] });
    });
  }
};

const putUserController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  await updateUser(id, data).then(() => {
    sendResponse(res, { message: 'User updated successfully.' });
  }).catch(() => {
    sendResponse(res, { error: 'PUT user failed.' }, 400);
  });
};

const deleteUserController = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id).then(() => {
    sendResponse(res, { message: 'User deleted successfully.' });
  }).catch(() => {
    sendResponse(res, { error: 'DELETE user failed.' }, 400);
  });
};

module.exports = {
  getAllUserController,
  getUserByIDController,
  postUserController,
  putUserController,
  deleteUserController
}
