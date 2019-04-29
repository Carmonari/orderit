import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';
import homesReducer from './homesReducer';
import sectionsReducer from './sectionsReducer';
import productReducer from './productReducer';

export default combineReducers({
  auth: authReducer,
  user: usersReducer,
  home: homesReducer,
  section: sectionsReducer,
  product: productReducer,
  errors: errorReducer
});