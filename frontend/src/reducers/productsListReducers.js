import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
} from '../constants/actionTypes';

//request for all products
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    //  when get request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    // when get products successfully
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    //when get products fail
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
//delete single product
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
