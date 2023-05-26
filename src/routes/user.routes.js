const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.use(express.json());

router.post("/user", userController.createUser);

module.exports = router;
