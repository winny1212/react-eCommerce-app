import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productsListReducers';
import { productDeatilsReducer } from './reducers/productDetailsReducer';
import { cartReducer } from './reducers/cartReducers';

//combine all reducers
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatilsReducer,
  cart: cartReducer,
});

//get  cart item  from local storage used for initial state
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

//initial state
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk];

//create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
