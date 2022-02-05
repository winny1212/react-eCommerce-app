import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer } from './reducers/productsListReducers';
import { productDeatilsReducer } from './reducers/productDetailsReducer';

//combine all reducers
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatilsReducer,
});

//initial state
const initialState = {};

const middleware = [thunk];

//create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
