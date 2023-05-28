const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshop.controller');
const cors = require('cors');

router.use(express.json());
router.use(cors());

//UC501
router.post('/workshop', workshopController.createWorkshop);

//UC502
router.get('/workshop', workshopController.getWorkshops);

//UC503
router.delete('/workshop/:workshopId', workshopController.deleteWorkshop);

module.exports = router;
