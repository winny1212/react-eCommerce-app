import express from 'express';

const router = express.Router();

router.get('/api/products', (req, res) => {
  res.json(products);
});

router.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});
