const express = require('express');
const ProductController = require('../controllers/productController');
const Auth = require('../middlewares/Auth');

const ProductRoutes = express.Router();

const productController = new ProductController();

ProductRoutes.get('/product/search', productController.getAllProducts);
ProductRoutes.get('/product/:id', productController.getProductById);
ProductRoutes.post('/product', Auth, productController.createProduct);
ProductRoutes.put('/product/:id', Auth, productController.updateProduct);
ProductRoutes.delete('/product/:id', Auth, productController.deleteProduct);

module.exports = ProductRoutes;