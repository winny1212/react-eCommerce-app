import React, { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
// import { products } from '../data';
import axios from 'axios';
import Product from '../components/Product';

//set the products state
const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  //get the products by axios
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>The Newest Arrive</h1>
      <Row>
        {/* map the products */}
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
