const express = require('express');
const router = express.Router();
const cors = require('cors');
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');

router.use(express.json());
router.use(cors());

//UC401 Create Product
router.post('/product', productController.createProduct);

//UC402 Get Products
router.get('/product', productController.getProducts);

//UC403 Update Product
router.put('/product/:productId', productController.updateProduct);

//UC404 Delete Product
router.delete('/product/:productId', productController.deleteProduct);

//UC405 Get Product By Id
router.get('/product/:productId', productController.getProductById);




module.exports = router;
