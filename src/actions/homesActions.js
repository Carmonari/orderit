import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { GET_ERRORS, GET_HOMES } from './types';

//Login - get user token
export const getHomes = () => async (dispatch) => {
  try{
    let res = await axios.get('http://10.0.2.2:5000/api/homes');
    dispatch({
      type: GET_HOMES,
      payload: res.data
    });
  }
  catch(err){
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  } 
}
