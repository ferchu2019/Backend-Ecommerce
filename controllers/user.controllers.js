const User = require('../models/user.model');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');

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
        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({message: "usuario no autorizado"})
        }
        const user = await User.findById(id);
        if(!user){
            return res.status(404).send("El usuario no fue encontrado")
        }else{
        console.log(user)
        user.password = undefined;
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
        const {id} = req.params;
        if(req.user.role !== "admin" && id !== req.user._id){
            return res.status(403).send({message: "Usuario sin permisos"})
        }
        const user = await User.findByIdAndUpdate(id, req.body, {new: true})
        console.log(user)
        return res.send({ ok: false, message: "Usuario actualizado correctamente", user})
    } catch (error) {
        console.log(error);
        return res.status(500).send({ ok: false, message: "Error al actualizar usuario"})
    }
}

async function login(req, res) {
    try {
        const { email, password} = req.body;
        console.log(email, password);
        if(!email || !password){
            return res.status(400).send({message: "email y contraseña son requeridos"})
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).send({message: "error al realizar login"})
        }

        const match = await bcrypt.compare(password, user.password)
        if(!match){
            return res.status(400).sen({message: "alguno de los datos es incorrecto"})
        }
        user.password = undefined;
        user.__v = undefined;

        const SECRET = process.env.SECRET;
        const token = jwt.sign(user.toJSON(), SECRET, {expiresIn: '1h'});
        console.log(token);

        res.send({message: "login exitoso", user, token})

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error al autenticar usuario"})
    }
}

module.exports = { getUsers, createUser, getUserById, deleteUser, updateUser, login}