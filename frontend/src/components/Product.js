import React from 'react';
import { Card } from 'react-bootstrap';

//single product info
const Product = ({ product }) => {
  return (
    <Card>
      {/* the product link */}
      <a href={`/products/${product._id}`}>
        {/* product image */}
        <Card.Img src={product.image} variant='top' />
      </a>
    </Card>
  );
};

export default Product;
