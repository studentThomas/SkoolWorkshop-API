const express = require('express');
const router = express.Router();
const cors = require('cors');
const categoryController = require('../controllers/category.controller');

router.use(express.json());
router.use(cors());

router.get('/categories', categoryController.getCategories);


module.exports = router;
