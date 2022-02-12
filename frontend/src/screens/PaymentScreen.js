import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymenScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }
  const [paymentMethod, setPaymentMethod] = useState('Paypal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <CheckoutSteps step1 step2 step3 />

          <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3'>
              <Form.Label as='legend'>Payment method:</Form.Label>

              <Col>
                <Form.Check
                  type='radio'
                  label='Paypal'
                  id='Paypal'
                  name='paymentMethod'
                  value='Paypal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
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

export default PaymenScreen;
