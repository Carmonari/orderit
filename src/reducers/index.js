import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';
import homesReducer from './homesReducer';

export default combineReducers({
  auth: authReducer,
  user: usersReducer,
  home: homesReducer,
  errors: errorReducer
});