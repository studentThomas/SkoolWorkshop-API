const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');
const cors = require('cors');

router.use(express.json());
router.use(cors());

//UC301
router.get('/stock/:productId', stockController.getStock);

//UC302
router.put('/stock/:productId', stockController.updateStock);

module.exports = router;
