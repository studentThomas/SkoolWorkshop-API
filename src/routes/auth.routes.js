const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

//UC-101
router.post('/login', controller.login);

module.exports = router;
