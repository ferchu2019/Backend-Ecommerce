const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');
const validation = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin')

router.get("/products", productController.getProducts);

router.post("/products", productController.createProduct);

router.get("/products/:_id", validation, productController.getProductById)

router.delete("/products/:_id", [validation, isAdmin], productController.deleteProduct)

router.put("/products/:_id", validation, productController.updateProduct);



module.exports = router;