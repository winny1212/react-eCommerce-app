const express = require('express');
const products = require('./data/products');

const app = express();

// custome routes
app.get('/', (req, res) => {
  res.send('the server is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(5000, console.log('The server is running on 5000 port'));
