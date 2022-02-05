import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup } from 'react-bootstrap';
// import { products } from '../data';
// import axios from 'axios';
import Product from '../components/Product';
import { listProducts } from '../actions';

//set the products state
const HomeScreen = () => {
  // the method for getting products by useState
  //   const [products, setProducts] = useState([]);
  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const { data } = await axios.get('/api/products');
  //       setProducts(data);
  //     };
  //     fetchProducts();
  //   }, []);

  //get the products by reducer
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  //   destructure the state of productList
  const { loading, error, products } = productList;

  //get the products page
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>The Newest Arrive</h1>
      {/* when get request , the page will show loading before get the products; but if there are error, it will show the error message */}
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Row>
          {/* map the products */}
          {products.map((product) => (
            <Col xs={12} sm={6} md={6} lg={4} xl={3}>
              <Product key={product.id} product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
