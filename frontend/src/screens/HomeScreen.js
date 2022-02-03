import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { products } from '../data';
import Product from '../components/Product';

const HomeScreen = () => {
  return (
    <>
      <h1>The Newest Arrive</h1>
      <Row>
        {products.map((product) => (
          <Col xs={12} sm={6} md={6} lg={4} xl={3}>
            <Product key={product.id} product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
