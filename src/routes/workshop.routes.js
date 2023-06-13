const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshop.controller');
const cors = require('cors');

router.use(express.json());
router.use(cors());

//UC501 Create Workshop
router.post('/workshop', workshopController.createWorkshop);

//UC502 Get Workshops
router.get('/workshop', workshopController.getWorkshops);

//UC503 Update Workshop
router.put('/workshop/:workshopId', workshopController.updateWorkshop);

//UC504 Delete Workshop
router.delete('/workshop/:workshopId', workshopController.deleteWorkshop);

module.exports = router;
