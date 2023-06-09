const express = require('express');
const router = express.Router();
const cors = require('cors');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

router.use(express.json());
router.use(cors());

//UC601 Create Order
router.post('/order', orderController.createOrder);

//UC602 Get Orders
router.get('/order', orderController.getOrders);




module.exports = router;