import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { products } from './data/products.js';

dotenv.config();
connectDB();

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

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `The server is running on the ${PORT} under the ${process.env.NODE_ENV} environment `
  )
);
