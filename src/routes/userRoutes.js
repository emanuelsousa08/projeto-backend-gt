const express = require('express');
const userController = require('../controllers/userController');
const Auth = require('../middlewares/Auth');


const UserRoutes = express.Router();

const UserController = new userController();

UserRoutes.get('/user/:id', UserController.getUserById);
UserRoutes.post('/user', UserController.createUser);
UserRoutes.put('/user/:id', Auth, UserController.updateUser);
UserRoutes.delete('/user/:id', Auth, UserController.deleteUser);

module.exports = UserRoutes;
