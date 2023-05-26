const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.use(express.json());

//UC401
router.post("/product", productController.addProduct);

//UC402
router.get("/product/:workshopId", productController.getProducts);

//UC403
router.put("/product/:productId", productController.updateProduct);

//UC404
router.delete("/product/:productId", productController.deleteProduct);

module.exports = router;
