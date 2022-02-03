import Rating from './Rating';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

//single product info
const Product = ({ product }) => {
  return (
    <Card className='my-3 py-3 rounded'>
      {/* the product link */}
      <Link to={`/products/${product._id}`}>
        {/* product image */}
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} comments`}
            color='#f8e825'
          />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
