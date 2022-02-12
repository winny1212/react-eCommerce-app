import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  ListGroup,
  Row,
  Col,
  Image,
  Card,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceorderScreen = () => {
  const cart = useSelector((state) => state.cart);

  //function for keep two decimal points
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  //calculate items price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  //calculate shipping price
  cart.shippingPrice = addDecimals(cart.itemsPrice > 5000 ? 0 : 20);
  //calculate total price
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  );
  //submit order function
  const placeorderHandler = () => {
    console.log('submit');
  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {/* shipping address info */}
            <ListGroup.Item>
              <h2>Shipping Address</h2>
              <p>
                <strong>Address：</strong>
                {cart.shippingAddress.streetAddress},
                {cart.shippingAddress.suburb},{cart.shippingAddress.state},
                {cart.shippingAddress.postCode}
              </p>
            </ListGroup.Item>
            {/* payment info */}
            <ListGroup.Item>
              <h2>Payment</h2>
              <strong>Paid by：</strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            {/* cart infomation */}
            <ListGroup.Item>
              <h2>Your cart</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        {/* order details */}
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X {item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>order details</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Delivery fee</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  onClick={placeorderHandler}
                  disabled={cart.cartItems === 0}
                >
                  Submit
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceorderScreen;
