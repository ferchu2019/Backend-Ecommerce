const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');
// // const validation = require('../middlewares/authentication');
// const isAdmin = require('../middlewares/isAdmin')
const upload = require('../middlewares/uploadFile');

router.get("/products", productController.getProducts);

router.post("/products", [ upload], productController.createProduct);

router.get("/products/:_id", productController.getProductById)

router.delete("/products/:_id", productController.deleteProduct)

router.put("/products/:_id",[upload], productController.updateProduct);



module.exports = router;