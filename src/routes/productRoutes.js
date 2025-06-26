const express = require('express');
const ProductController = require('../controllers/productController');
const Auth = require('../middlewares/Auth');

const router = express.Router();
const productController = new ProductController();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;