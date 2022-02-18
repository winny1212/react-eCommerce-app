import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/actionTypes';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';

//set the state
const ProductScreen = ({ match, history }) => {
  //   const [product, setProduct] = useState([]);

  //   //get the single product
  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       const { data } = await axios.get(`/api/products/${match.params.id}`);
  //       setProduct(data);
  //     };
  //     fetchProduct();
  //   }, [match]);

  //set the quantity added to cart
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //access to the state of single product details
  const productDetails = useSelector((state) => state.productDetails);
  //destructure
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  //get product details
  useEffect(() => {
    if (successProductReview) {
      alert('Comment successfully！');
      setRating(0);
      setComment('');
    }
    if (
      !product._id ||
      product._id !== match.params.id ||
      successProductReview
    ) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  //function for adding product to cart
  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  //function for submit comment
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(match.params.id, { rating, comment }));
  };
  return (
    <div>
      {/* go back to the homepage */}
      <Link className='btn btn-secondary my-3' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {/* display image */}
            <Col md={4}>
              <Image
                className='ms-auto'
                src={product.image}
                alt={product.name}
                fluid
              />
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
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Select
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={handleAddToCart}
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
          {/* Comment/review */}
          <Row>
            <Col md={6}>
              <h2>comment</h2>
              {product.reviews && product.reviews.length === 0 && (
                <Message>Haven't comment here!</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                <ListGroup.Item>
                  <h2>Create comment</h2>
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group>
                        <Form.Label>Rating：</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Very disatisfied</option>
                          <option value='2'>2 - Disatisfied</option>
                          <option value='3'>3 - OK</option>
                          <option value='4'>4 - Satisfied</option>
                          <option value='5'>5 - Very Satisfied</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please comment after <Link to='/login'> Login</Link>
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
      {/*display the single product details  */}
    </div>
  );
};

export default ProductScreen;
