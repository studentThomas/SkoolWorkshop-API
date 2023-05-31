const express = require('express');
const router = express.Router();
const cors = require('cors');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

router.use(express.json());
router.use(cors());

//UC501 
router.post('/order', orderController.createOrder);




module.exports = router;