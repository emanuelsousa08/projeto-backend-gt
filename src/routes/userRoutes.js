const express = require('express');
const userController = require('../controller/userController');
const Auth = require('../middlewares/Auth');


const UserRoutes = express.Router();

const UserController = new userController();

// GET /v1/user/:id
UserRoutes.get('/user/:id', UserController.getUserById);
UserRoutes.post('/user', UserController.createUser);
UserRoutes.put('/user/:id', Auth, UserController.updateUser);
UserRoutes.delete('/user/:id', Auth, UserController.deleteUser);

module.exports = UserRoutes;
