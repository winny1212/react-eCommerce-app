import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';

//set the state
const ProductScreen = ({ match }) => {
  //   const [product, setProduct] = useState([]);

  //   //get the single product
  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       const { data } = await axios.get(`/api/products/${match.params.id}`);
  //       setProduct(data);
  //     };
  //     fetchProduct();
  //   }, [match]);

  const dispatch = useDispatch();
  //access to the state of single product details
  const productDetails = useSelector((state) => state.productDetails);
  //destructure
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const product = {};
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
      )}
      {/*display the single product details  */}
    </div>
  );
};

export default ProductScreen;
