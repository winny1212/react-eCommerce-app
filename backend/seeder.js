import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

//connect to database
dotenv.config();
connectDB();

//insert the dummy data
const importData = async () => {
  try {
    //clear database before inserting
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    //insert dummy data
    const createdUsers = await User.insertMany(users);
    // get the admin user
    const adminUser = createdUsers[0]._id;
    //insert the admin user to the product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('data insert succeffully！'.green.inverse);

    // exit the process after inserting
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};

const destroyData = async () => {
  try {
    //clear database before inserting
    await Order.deleteMany();
    await User.deleteMany();
    await Product.deleteMany();

    console.log('data detroy succeffully！'.green.inverse);

    // exit the process after inserting
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
  }
};
