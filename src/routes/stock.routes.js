const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

router.use(express.json());

//UC301
router.get("/stock/:productId", stockController.getStock);

//UC302
router.put("/stock/:productId", stockController.updateStock);

module.exports = router;
