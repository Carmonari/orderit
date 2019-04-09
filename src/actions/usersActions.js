import axios from 'axios';
import { ADD_USER, GET_ERRORS, CLEAR_ERRORS } from './types';

//Add user
export const addUser = (newUser, history) => async dispatch => {
  try{
    dispatch(clearErrors());
    let res = await axios.post('http://10.0.2.2:5000/api/users/register', newUser);
    dispatch({
      type: ADD_USER,
      payload: res.data
    });
    history.push('/');
  }
  catch(err){
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}