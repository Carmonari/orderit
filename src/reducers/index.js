import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';
import homesReducer from './homesReducer';
import sectionsReducer from './sectionsReducer';
import productReducer from './productReducer';
import shoppingReducer from './shoppingReducer';

export default combineReducers({
  auth: authReducer,
  user: usersReducer,
  home: homesReducer,
  section: sectionsReducer,
  product: productReducer,
  pedido: shoppingReducer,
  errors: errorReducer
});