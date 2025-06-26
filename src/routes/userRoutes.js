const express = require('express');
const userController = require('../controllers/userController');
const Auth = require('../middlewares/Auth');


const userRoutes = express.Router();

const UserController = new userController();

// GET /v1/user/:id
userRoutes.get('/v1/user/:id', UserController.getUserById);
userRoutes.post('/v1/user', UserController.createUser);
userRoutes.put('/v1/user/:id', Auth, UserController.updateUser);
userRoutes.delete('/v1/user/:id', Auth, UserController.deleteUser);

module.exports = userRoutes;
