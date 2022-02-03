import React from 'react';
import { Card } from 'react-bootstrap';

//single product info
const Product = ({ product }) => {
  return (
    <Card className='my-3 py-3 rounded'>
      {/* the product link */}
      <a href={`/products/${product._id}`}>
        {/* product image */}
        <Card.Img src={product.image} variant='top' />
      </a>
      <Card.Body>
        <a href={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </a>
        <Card.Text as='div'>
          <div className='my-3'>
            {product.rating} is calculated by the {product.numReviews} comments.
          </div>
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
