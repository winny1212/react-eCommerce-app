import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from '../constants/actionTypes';
import axios from 'axios';
//add item to cart action
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  //store the cart items in local
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

//remove items from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
