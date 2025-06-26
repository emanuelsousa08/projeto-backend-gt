const express = require('express');
const CategoryRoutes = express.Router();
const CategoryController = require('../../controllers/CategoryController');

// GET /v1/category/search - Lista de categorias com filtros
CategoryRoutes.get('/category/search', CategoryController.search);

module.exports = CategoryRoutes;