import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';
// import { products } from '../data';
// import axios from 'axios';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ProductsCarousel from '../components/ProductsCarousel';
const Title = styled.h1`
  color: rgb(119, 119, 119);
  font-size: 2em;
  text-align: center;
  margin-top: 25px;
`;
const Wrapper = styled.div`
  transition: all 0.5s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    cursor: pointer;
  }
`;
//set the products state
const HomeScreen = ({ match }) => {
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
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  //   destructure the state of productList
  const { loading, error, products } = productList;

  //get the products page
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {!keyword && <ProductsCarousel />}
      <Title>The Newest Arrive</Title>
      {/* when get request , the page will show loading before get the products; but if there are error, it will show the error message */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {/* map the products */}
          {products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
              <Wrapper>
                <Product product={product} />
              </Wrapper>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
