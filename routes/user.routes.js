const express = require('express');
const router = express.Router();

router.get("/users", async(req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send("Error al obtener usuario")
    }
})

router.post("/users", (req, res) => {
    const user = new User(req.body)
    user.save().then((newUser) => {
        console.log(newUser);
        res.send("El usuario se ha creado correctamente")
             }).catch(error => {
                console.log(error);
                res.send("El usuario no se pudo crear")
            })
})
