import Rating from './Rating';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
const Tag = styled.div`
  color: #ec5285;
`;

//single product info
const Product = ({ product }) => {
  return (
    <Card className='my-3 rounded'>
      {/* the product link */}
      <Link to={`/products/${product._id}`}>
        {/* product image */}
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link
          style={{ textDecoration: 'none' }}
          to={`/products/${product._id}`}
        >
          <Tag>
            <Card.Title className='text-decoration-none'>
              {product.name}
            </Card.Title>
          </Tag>
        </Link>
        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} comments`}
            color='#f8e825'
          />
        </Card.Text>
        <Card.Text as='h5'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
