import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/actionTypes';

const ProfileScreen = ({ location, history }) => {
  // initial profile page state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  //access to user details
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  //check if the user is login or not, if not go to the login page, if already login then we filled the user form with the user information
  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);
  //handle submit form function
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update profile function
    dispatch(updateUserDetails({ id: user._id, name, email, password }));
  };
  return (
    <Row>
      <Col md={4}>
        <h2>Personal details</h2>
        {success && <Message variant='success'>Update sucessfully！</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>Username：</Form.Label>
            <Form.Control
              type='name'
              placeholder='Username'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email：</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password：</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className='mb-3' controlId='confirmPassword'>
            <Form.Label>Password confirmation：</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password confirmation'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant='primary' type='submit'>
            Edit
          </Button>
        </Form>
      </Col>
      <Col md={4}>
        <h2>My order:</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
