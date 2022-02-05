import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';

//create the get all products route
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//create the single products route
router.get('/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

export default router;
