const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user.controllers');
// const validation = require('../middlewares/authentication');
// const isAdmin = require('../middlewares/isAdmin');
const uploadUser = require('../middlewares/upLoadFileUser');

router.get("/users", userControllers.getUsers)

router.post("/users", [ uploadUser], userControllers.createUser)

router.get("/users/:id", userControllers.getUserById)

router.delete("/users/:id", userControllers.deleteUser)

router.put("/users/:id",  userControllers.updateUser);

router.post("/login", userControllers.login);

module.exports = router;
