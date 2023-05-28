const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');
const cors = require('cors');

router.use(express.json());
router.use(cors());

//UC401
router.post('/product', productController.createProduct);

//UC402
router.get('/product/:workshopId', productController.getProducts);

//UC403
router.put('/product/:productId', productController.updateProduct);

//UC404
router.delete('/product/:productId', productController.deleteProduct);

module.exports = router;
