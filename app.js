const express = require('express');
const app = express();
const User = require('./models/user.model')

app.use(express.json())



app.delete("/users", (req, res) => {
    return res.send(`Usuario borrado`)
})

module.exports = app;