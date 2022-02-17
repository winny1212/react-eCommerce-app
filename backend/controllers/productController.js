import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc    get all products in database
//@route   GET/api/products
//@access  public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc    get single product
//@route   GET/api/products/:id
//@access  public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Oops, can't find it");
  }
});

//@desc    delete single product
//@route   DELETE/api/products/:id
//@access  private for admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: 'Delete successfully!' });
  } else {
    res.status(404);
    throw new Error('No product!');
  }
});

export { getProducts, getProductById, deleteProduct };
