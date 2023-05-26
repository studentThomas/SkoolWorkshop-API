const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');

router.use(express.json());

router.post('/product', productController.createProduct);
router.get('/product/:workshopId', productController.getProducts);
router.put('/product/:productId', productController.updateProduct);
router.delete('/product/:productId', productController.deleteProduct);

module.exports = router;
