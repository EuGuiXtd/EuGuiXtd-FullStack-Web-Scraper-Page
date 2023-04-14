const express = require('express');
const cors = require('cors');

const app = express();

const productsController = require('../database/controllers/products');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.status(200).json({ message: 'yep' }));

app.post('/products', productsController.getProductsAndPostSearch);


module.exports = app;