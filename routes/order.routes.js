const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controllers');

router.get('/order',orderController.getOrder);

router.post('/order', orderController.createOrder);

router.delete('/order', orderController.deleteOrder);



module.exports = router;