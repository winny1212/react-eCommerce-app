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
import Rating from '../components/Rating';

const ProductScreen = () => {
  //get the product id
  const params = useParams();

  //get the product
  const product = products.find((product) => product._id === params.id * 1);
  //   console.log(product);

  return (
    <div>
      {/* go back to the homepage */}
      <Link className='btn btn-secondary my-3' to='/'>
        Back
      </Link>
      {/*display the single product details  */}
      <Row>
        {/* display image */}
        <Col md={4}>
          <Image src={product.image} alt={product.name} class='float-right' />
        </Col>

        {/* display image details */}
        <Col md={5}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} comments`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price：${product.price}</ListGroup.Item>
            <ListGroup.Item>Details：{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
