const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const cors = require('cors');

router.use(express.json());
router.use(cors());

//UC201 Create User
router.post('/user', userController.createUser);

module.exports = router;
