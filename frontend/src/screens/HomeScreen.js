import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { products } from '../data';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <>
      <h1>The Newest Arrive</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
