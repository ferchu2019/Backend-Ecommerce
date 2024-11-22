const Product = require('../models/product.model');


async function getProducts(req, res) {
    try {
        const products = await Product.find();
        return res.status(200).send({message:"Productos obtenidos conrrectamente", products});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Error al obtener productos"});   
    }
}

async function createProduct(req, res) {
    try {
        const product = new Product(req.body);
        const newProduct = await product.save();
        return res.status(201).send({message:'producto creado', product: newProduct})

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error al crear producto'})
    }    
}

async function getProductById(req, res) {
    try {
        const {_id} = req.params;
        const product = await Product.findById(_id);
        return res.status(200).send({ok:true,message: "Producto encontrado", product})
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al obtener producto")     
    }    
}

async function deleteProduct(req, res) {
    try {
        const {_id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(_id)
        return res.status(200).send({ok:true, message:"El producto fue borrado correctamente", deletedProduct})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ok:false, message:"Error al borrar el producto"})
    }
}

async function updateProduct(req, res) {
    try {
        const {_id} = req.params;
        const product = req.body;
        if(req.file){
            product.image = req.file.filename;
        }
        const productUpdate = await Product.findByIdAndUpdate(_id, req.body, {new: true})
        console.log(product)
        return res.status(200).send({ ok: false, message: "Producto actualizado correctamente", productUpdate})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: "Error al actualizar producto"})
    }
}


module.exports = {getProducts, createProduct, getProductById, deleteProduct, updateProduct}