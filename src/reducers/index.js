import { combineReducers } from 'redux';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  user: usersReducer,
  errors: errorReducer
});