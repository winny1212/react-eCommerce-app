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
  const params = useParams();

  //get the product
  const product = products.find((product) => product._id === params.id * 1);

  //   console.log(product);
  return (
    <div>
      <Link className='btn btn-secondary my-3' to='/'>
        Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item>价格：¥{product.price}</ListGroup.Item>
            <ListGroup.Item>描述：¥{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
