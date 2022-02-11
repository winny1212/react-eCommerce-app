import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // initial state
  const [address, setAddress] = useState(shippingAddress.address);
  const [state, setState] = useState(shippingAddress.state);
  const [postCode, setPostCode] = useState(shippingAddress.postCode);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, state, postCode }));
    history.push('/payment');
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 />
          <h1>Delivery address</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3' controlId='address'>
              <Form.Label>Address：</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='state'>
              <Form.Label>State：</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter state'
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group className='mb-3' controlId='postCode'>
              <Form.Label>Postcode：</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postcode'
                value={postCode}
                required
                onChange={(e) => setPostCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Next
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ShippingScreen;
