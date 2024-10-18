const app = require('./app')
const PORT = 3000;
const mongoose = require('mongoose');

const DataBaseURL = "mongodb+srv://f3rn4nd42022:ohyR9VHXTr1MQdpR@ecommerce.dtar5.mongodb.net/ecommerce";

mongoose.connect(DataBaseURL).then(() => {
    console.log("Se conecto exitosamente a la base de datos")
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
}).catch(error => console.log("Error al conectar a la Base de datos", error));


