const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controllers');

router.get('/categories', categoryController.getCategories);

router.post('/categories', categoryController.createCategories);

router.delete('categories', categoryController.deleteCategory);



module.exports = router;