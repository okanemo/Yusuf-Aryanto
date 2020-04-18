const express = require('express');
const Router = express.Router();
const { authorize } = require('../helper');
const {
  getAllUserController,
  getUserByIDController,
  postUserController,
  putUserController,
  deleteUserController
} = require('../controllers/users');

Router.get('/', authorize('read_permission'), getAllUserController);
Router.get('/:id', authorize('read_permission'), getUserByIDController);
Router.post('/', authorize('create_permission'), postUserController);
Router.put('/:id', authorize('update_permission'), putUserController);
Router.delete('/:id', authorize('delete_permission'), deleteUserController);

module.exports = Router;
