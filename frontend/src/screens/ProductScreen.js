import React, { useState, useEffect } from 'react';
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
import axios from 'axios';
import Rating from '../components/Rating';

//set the state
const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);

  //get the single product
  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match]);

  return (
    <div>
      {/* go back to the homepage */}
      <Link className='btn btn-secondary my-3' to='/'>
        Back
      </Link>
      {/*display the single product details  */}
      <Row>
        {/* display image */}
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        {/* display image details */}
        <Col md={4}>
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
            <ListGroup.Item>Price:${product.price}</ListGroup.Item>
            <ListGroup.Item>Details：{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* display stock info and add to cart button */}
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price：</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>In Stock：</Col>
                  <Col>
                    <strong>{product.countInStock}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
