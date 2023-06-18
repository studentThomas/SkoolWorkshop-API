const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const cors = require('cors');

router.use(express.json());
router.use(cors());

//UC201 Create User
router.post('/user', userController.createUser);

//UC202 Get User
router.get('/user', userController.getUsers);

//UC203 Update User
router.put('/user/:userId', userController.updateUser);

//UC204 Delete User
router.delete('/user/:userId', userController.deleteUser);

//UC205 Get User By Id
router.get('/user/:userId', userController.getUserById);

module.exports = router;
