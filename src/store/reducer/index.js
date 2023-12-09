import { createStore, combineReducers } from 'redux';
import userReducer from "./userReducer"
import cartReducer from './cartReducer';
import sellerProductsReducer from './sellerReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import buyerProductsReducer from './buyerReducer';
import favoriteReducer from './favoriteReducer';
const rootReducer = combineReducers(
     {
          user: userReducer,
          cart: cartReducer,
          seller: sellerProductsReducer,
          buyer: buyerProductsReducer,
          favorite: favoriteReducer
     }
);
const configureStore = () => {
     return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;