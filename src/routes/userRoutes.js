const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Auth = require('../middlewares/Auth');

// GET /v1/user/:id
router.get('/v1/user/:id', userController.getUserById);
router.post('/v1/user', userController.createUser);
router.put('/v1/user/:id', Auth, userController.updateUser);
router.delete('/v1/user/:id', authMiddleware, userController.deleteUser);

module.exports = router;
