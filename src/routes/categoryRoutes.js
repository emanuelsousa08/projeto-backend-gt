const express = require('express');
const CategoryController = require('../controllers/categoryController');
const Auth = require('../middlewares/Auth');

const router = express.Router();
const categoryController = new CategoryController();

router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;