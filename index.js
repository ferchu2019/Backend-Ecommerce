require('dotenv').config();
const app = require('./app');
const reset = "\x1b[0m";
const PORT = 3000;
const mongoose = require("mongoose");

const DataBaseURL = process.env.Mongo_URI;

mongoose.connect(DataBaseURL).then(() => {
    console.log(`\x1b[36m Se conecto exitosamente a la base de datos ${reset}`)
    app.listen(PORT, () => {
        console.log(`\x1b[31m server is running on port ${PORT} ${reset}`);
    })
}).catch(error => console.log("Error al conectar a la Base de datos", error));


