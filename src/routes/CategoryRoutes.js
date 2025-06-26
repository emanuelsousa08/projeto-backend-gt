const express = require('express');
const CategoryController = require('../controllers/categoryController');
const Auth = require('../middlewares/Auth');

const CategoryRoutes = express.Router();

const categoryController = new CategoryController();

CategoryRoutes.get('/category/search', categoryController.getAllCategories);
CategoryRoutes.get('/category/:id', categoryController.getCategoryById);
CategoryRoutes.post('/category', Auth, categoryController.createCategory);
CategoryRoutes.put('/category/:id', Auth, categoryController.updateCategory);
CategoryRoutes.delete('/category/:id', Auth, categoryController.deleteCategory);

module.exports = CategoryRoutes;