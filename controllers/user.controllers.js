const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function getUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener los usuarios")
    }
}

async function createUser(req, res) {
    if(!req.body.password){
        return res.status(400).send({ok: false, message:"campo requerido"})
    }
    const user = new User(req.body);
    bcrypt.hash(user.password, saltRounds, (error, hash) => {
        if(error){ 
            console.log(error);
            return res.status(500).send({ok:false, message:"Error al crear usuario"})}
        user.password = hash;
        user.save().then((newUser) => {
        console.log(newUser);
        res.status(201).send(newUser);
        }).catch(error => {
            console.log(error);
            res.status(500).send("El usuario no se pudo crear")
        })
    })    
}

async function getUserById(req, res) {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send("El usuario no fue encontrado")
        }else{
        console.log(user)
        return res.status(200).send(user)}
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error al obtener usuario")     
    }    
}

async function deleteUser(req, res) {
    try {
        
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id)
        return res.status(200).send({ok:true, message:"El usuario fue borrado correctamente", deletedUser})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ok:false, message:"Error al borrar al usuario"})
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params
        const user = await User.findByIdAndUpdate(id, req.body, {new: true})
        console.log(user)
        return res.send({ ok: false, message: "Usuario actualizado correctamente", user})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: "Error al actualizar usuario"})
    }
}

async function login(req, res) {
    res.send("Login endpoint")
}

module.exports = { getUsers, createUser, getUserById, deleteUser, updateUser, login}