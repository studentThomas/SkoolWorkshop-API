const express = require('express');
const router = express.Router();
const cors = require('cors');
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');

router.use(express.json());
router.use(cors());

//UC401
router.post('/product', productController.createProduct);

//UC402
router.get('/product', productController.getProducts);

//UC403
router.put('/product/:productId', productController.updateProduct);

//UC404
router.delete('/product/:productId', productController.deleteProduct);

module.exports = router;
