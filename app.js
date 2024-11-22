const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/categoy.routes');
const cors =require('cors');

app.use(cors())
app.use(express.json())
app.use([userRoutes, productRoutes, categoryRoutes])



module.exports = app;