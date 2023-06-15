const express = require('express');
const router = express.Router();
const cors = require('cors');
const notificationController = require('../controllers/notification.controller');

router.use(express.json());
router.use(cors());

router.get('/notification', notificationController.getNotifications);


module.exports = router;