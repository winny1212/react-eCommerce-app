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

//@desc    create product
//@route   POST/api/products
//@access  private(admin）
const createProduct = asyncHandler(async (req, res) => {
  //create a template for creating a new product
  const product = new Product({
    name: 'Name',
    price: 0,
    user: req.user._id,
    image: '/assets/p2.jpg',
    category: 'Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Description',
    rating: 0,
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc    update
//@route   PUT/api/products/:id
//@access  private(admin）
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,

    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;

    product.category = category;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Can not find it!');
  }
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
