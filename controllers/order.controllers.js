const Order = require('../models/order.model');

async function getOrder(req, res) {
    try {
        const orders =  await Order.find().populate('user', "name email").populate('products.product', "name price image");
        return res.status(200).send({message:"orden obtenida correctamente", orders});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Error al obtener la orden"});   

    }
}

async function createOrder(req, res) {
    try {
        const order = new Order(req.body);
        const newOrder = await order.save();
        return res.status(201).send({message:'orden creada', newOrder})

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error al crear orden'})
    }    
}

async function deleteOrder(req, res) {
    try {
       const{_id}=req.params;
       const deletedOrder = await Order.findByIdAndDelete(_id)
        return res.status(200).send({ok:true, message:"La orden fue borrada correctamente", deletedOrder})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ok:false, message:"Error al borrar la orden"})
    }
}

module.exports = {getOrder, createOrder, deleteOrder}