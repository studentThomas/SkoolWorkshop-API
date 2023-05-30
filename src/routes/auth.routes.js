const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const cors = require('cors');
router.use(express.json());
router.use(cors());

//UC-101 Login
router.post('/login', controller.login);

module.exports = router;
