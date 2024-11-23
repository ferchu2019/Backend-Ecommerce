const Category = require('../models/category.model');

async function getCategories(req, res) {
    try {
        const categories =  await Category.find();
        return res.status(200).send({message:"Categorías obtenidas correctamente", categories});
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"Error al obtener categoría"});   

    }
}

async function createCategories(req, res) {
    try {
        const category = new Category(req.body);
        const newCategory = await category.save();
        return res.status(201).send({message:'categoría creada', newCategory})

    } catch (error) {
        console.log(error)
        return res.status(500).send({message:'Error al crear categoría'})
    }    
}

async function deleteCategory(req, res) {
    try {
       
        return res.status(200).send({ok:true, message:"La categoría fue borrada correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ok:false, message:"Error al borrar la categoría"})
    }
}

module.exports = {getCategories, createCategories, deleteCategory}