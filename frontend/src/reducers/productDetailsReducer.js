import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/actionTypes';

//request for single product
export const productDeatilsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    // request
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    // request success
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    // request fail
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
