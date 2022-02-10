//import constants
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from '../constants/actionTypes';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // function for action of ADD_ITEM_TO_CART
    case ADD_ITEM_TO_CART:
      //   get the item from request
      const item = action.payload;
      //  check if the item is already exist in the cart list or not
      const existItem = state.cartItems.find((x) => x.product === item.product);
      // if the item is already exist, return the item in the cart, or add the new item to the cart
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    //remove items
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};
