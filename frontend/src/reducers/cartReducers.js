//import constants
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
} from '../contents/cartContents';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    // function for action of ADD_ITEM_TO_CART
    case ADD_ITEM_TO_CART:
      //   get the item from request
      const item = aciton.payload;
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
    default:
      return state;
  }
};
