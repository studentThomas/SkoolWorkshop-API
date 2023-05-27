const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshop.controller");

router.use(express.json());

router.post("/workshop", workshopController.addWorkshop);
router.get("/workshop", workshopController.getWorkshops);
router.delete("/workshop/:workshopId", workshopController.deleteWorkshop);

module.exports = router;
