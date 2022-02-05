import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import { products } from './data/products.js';
import productRoutes from './routes/productRoutes';

dotenv.config();
connectDB();

const app = express();

// custome routes
app.get('/', (req, res) => {
  res.send('the server is running');
});

//products route
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `The server is running on the ${PORT} under the ${process.env.NODE_ENV} environment `
      .yellow.bold
  )
);
