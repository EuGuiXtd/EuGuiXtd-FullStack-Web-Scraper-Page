const express = require('express');

const app = express();

const productsController = require('../database/controllers/products');

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'yep' }));

app.post('/products', productsController.getProductsAndPostSearch);


module.exports = app;