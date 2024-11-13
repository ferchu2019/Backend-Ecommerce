const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');
const validation = require('../middlewares/authentication');
const isAdmin = require('../middlewares/isAdmin')

router.get("/users", validation, userControllers.getUsers)

router.post("/users", userControllers.createUser)

router.get("/users/:id", validation, userControllers.getUserById)

router.delete("/users/:id", [validation, isAdmin], userControllers.deleteUser)

router.put("/users/:id", validation, userControllers.updateUser);

router.post("/login", userControllers.login);

module.exports = router;
