const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshop.controller");

router.use(express.json());

//UC501
router.post("/workshop", workshopController.addWorkshop);

//UC502
router.get("/workshop", workshopController.getWorkshops);

//UC503
router.delete("/workshop/:workshopId", workshopController.deleteWorkshop);

module.exports = router;
