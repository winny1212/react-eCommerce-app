import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import { products } from '../data';

const ProductScreen = () => {
  //get the product id
  const { id } = useParams;
  //get the product
  const product = products.find((product) => product._id === id * 1);

  return (
    <div>
      <Link className='btn btn-secondary my-3' to='/'>
        Back To Homepage
      </Link>
      <Row>
        <Col md={6}></Col>
        <Col md={3}></Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
