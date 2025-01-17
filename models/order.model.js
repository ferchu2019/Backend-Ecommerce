const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref:'User', required: true},
    products: [{ product: {type: Schema.Types.ObjectId, ref: 'Product'}, quantity: Number, price: Number}], 
    total: Number, 
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}

})


module.exports = mongoose.model('Order', orderSchema)